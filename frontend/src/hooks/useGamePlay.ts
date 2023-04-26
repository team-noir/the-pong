import { useContext, useEffect, useRef, useState } from 'react';
import useGameRTC from 'hooks/useGameRTC';
import { SocketContext } from 'contexts/socket';
import { GameResultType, PlayerType } from 'types';

const dummyResult: GameResultType = {
  id: 1,
  winner: {
    id: 1,
    nickname: 'Nickname1',
    level: 1,
    score: 11,
  },
  loser: {
    id: 101,
    nickname: 'Nickname2',
    level: 3,
    score: 9,
  },
  createdAt: '2023-04-07T00:00:00.000Z',
};

type ReturnType = [
  ball: typeof initialState.ball,
  paddles: typeof initialState.paddles,
  stageSize: number,
  isPlaying: boolean,
  count: number | null,
  handleMouseDown: (e: React.MouseEvent<HTMLButtonElement>) => void,
  handleMouseUp: (e: React.MouseEvent<HTMLButtonElement>) => void,
  result: GameResultType | null
];

export default function useGamePlay(
  gameId: number,
  amIViewer: boolean,
  amIOwner: boolean | undefined,
  containerRef: React.RefObject<HTMLElement>,
  myPlayer: PlayerType | undefined,
  otherPlayer: PlayerType | undefined
): ReturnType {
  const [ball, setBall] = useState(initialState.ball);
  const [paddles, setPaddles] = useState(initialState.paddles);
  const [stageSize, setStageSize] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [count, setCount] = useState(3);
  const [result, setResult] = useState<GameResultType | null>(null);
  const socket = useContext(SocketContext);

  const animationFrame = useRef<number | null>(null);
  const isMyKeyDown = useRef({ left: false, right: false });
  const isOtherKeyDown = useRef({ left: false, right: false });

  const [dataChannelRef] = useGameRTC(
    gameId,
    amIOwner,
    count,
    setCount,
    isPlaying,
    setIsPlaying,
    isOtherKeyDown
  );

  useEffect(() => {
    socket.on('ping', () => {
      socket.emit('pong');
    });

    socket.on('gameViewer', () => {
      // TODO: 게임 쿼리 수정
    });

    socket.on('roundOver', (data: PlayerType) => {
      // TODO: 게임 쿼리 수정
      // setGame((prev) => ({
      //   ...prev,
      //   players: prev.players.map((player) =>
      //     player.id === data.id ? { ...player, score: data.score } : player
      //   ),
      // }));
    });

    socket.on('gameOver', (data: GameResultType) => {
      setResult(data);
    });

    if (amIViewer) return;
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      socket.off('ping');
      socket.off('roundOver');
      socket.off('gameOver');
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    handleScreenResize();
    window.addEventListener('resize', handleScreenResize);
    return () => window.removeEventListener('resize', handleScreenResize);
  }, [containerRef.current]);

  useEffect(() => {
    if (amIViewer || !amIOwner) return;
    if (myPlayer?.score === 11 || otherPlayer?.score === 11) {
      setIsPlaying(false);
    } else {
      setBall(initialState.ball);
      setPaddles(initialState.paddles);
    }
  }, [myPlayer?.score, otherPlayer?.score]);

  useEffect(() => {
    if (amIViewer || !amIOwner || !isPlaying) return;
    animationFrame.current = requestAnimationFrame(draw);
    return () => {
      if (!animationFrame.current) return;
      cancelAnimationFrame(animationFrame.current);
    };
  }, [ball, isPlaying]);

  const drawBall = () => {
    if (ball.y === ball.r || ball.y === ballLimit) {
      const player = ball.y === ball.r ? myPlayer : otherPlayer;
      socket.emit('roundOver', {
        winnerId: player?.id,
      });
      return;
    }

    let dx = ball.dx;
    let dy = ball.dy;
    let ballX = ball.x + dx;
    let ballY = ball.y + dy;

    const isUp = ballY <= paddles.up.y + paddleSize.h + ball.r;
    const isDown = ballY >= paddles.down.y - ball.r;
    const paddle = isDown ? paddles.down : paddles.up;
    const isBetweenPaddleX =
      ballX >= paddle.x - ball.r && ballX <= paddle.x + paddleSize.w + ball.r;
    if ((isUp || isDown) && isBetweenPaddleX) {
      // NOTE: 공 y 좌표가 패들 y 좌표와 처음 겹치는 경우 공은 패들 y 좌표까지만 이동
      if (
        isDown &&
        ballY >= paddle.y - ball.r &&
        ballY <= paddle.y + dy - ball.r
      ) {
        ballY = paddle.y - ball.r;
      } else if (
        isUp &&
        ballY <= paddle.y + paddleSize.h + ball.r &&
        ballY >= paddle.y + paddleSize.h + dy + ball.r
      ) {
        ballY = paddle.y + paddleSize.h + ball.r;
      } else {
        // NOTE: 공 x 좌표가 패들 x 좌표와 겹치는 경우 공은 패들 x 좌표까지만 이동
        ballX =
          ballX < paddle.x + paddleSize.w / 2
            ? paddle.x - ball.r
            : paddle.x + paddleSize.w + ball.r;
        if (ballX <= ball.r || ballX >= ballLimit) {
          // NOTE: 패들이 벽에 붙어있었다면 공을 패들 위로 이동
          ballY = isUp ? paddle.y + paddleSize.h + ball.r : paddle.y - ball.r;
        }
        dx = -dx;
      }
      dy = -dy;
    }

    if (ballX <= ball.r) ballX = ball.r;
    if (ballX >= ballLimit) ballX = ballLimit;
    if (ballY <= ball.r) ballY = ball.r;
    if (ballY >= ballLimit) ballY = ballLimit;

    if (ballX === ball.r || ballX === ballLimit) {
      dx = -dx;
    }

    setBall((prevState) => ({
      ...prevState,
      x: ballX,
      y: ballY,
      dx,
      dy,
    }));
  };

  const drawPaddles = () => {
    if (isMyKeyDown.current.left) {
      const nextX = paddles.down.x - paddleDeltaX;
      setPaddles((prevState) => ({
        ...prevState,
        down: {
          ...prevState.down,
          x: nextX < 0 ? 0 : nextX,
        },
      }));
    }
    if (isMyKeyDown.current.right) {
      const nextX = paddles.down.x + paddleDeltaX;
      setPaddles((prevState) => ({
        ...prevState,
        down: {
          ...prevState.down,
          x: nextX > paddleLimitX ? paddleLimitX : nextX,
        },
      }));
    }
    if (isOtherKeyDown.current.left) {
      const nextX = paddles.up.x - paddleDeltaX;
      setPaddles((prevState) => ({
        ...prevState,
        up: {
          ...prevState.up,
          x: nextX < 0 ? 0 : nextX,
        },
      }));
    }
    if (isOtherKeyDown.current.right) {
      const nextX = paddles.up.x + paddleDeltaX;
      setPaddles((prevState) => ({
        ...prevState,
        up: {
          ...prevState.up,
          x: nextX > paddleLimitX ? paddleLimitX : nextX,
        },
      }));
    }
  };

  const draw = () => {
    drawPaddles();
    drawBall();
  };

  const handleScreenResize = () => {
    if (!containerRef.current) return;
    setStageSize(containerRef.current.clientWidth);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      if (amIOwner) {
        isMyKeyDown.current.left = true;
      } else {
        dataChannelRef.current?.send('DL');
      }
    }
    if (e.key === 'ArrowRight') {
      if (amIOwner) {
        isMyKeyDown.current.right = true;
      } else {
        dataChannelRef.current?.send('DR');
      }
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      if (amIOwner) {
        isMyKeyDown.current.left = false;
      } else {
        dataChannelRef.current?.send('UL');
      }
    }
    if (e.key === 'ArrowRight') {
      if (amIOwner) {
        isMyKeyDown.current.right = false;
      } else {
        dataChannelRef.current?.send('UR');
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;
    if (value === 'left') {
      if (amIOwner) {
        isMyKeyDown.current.left = true;
      } else {
        dataChannelRef.current?.send('DL');
      }
    }
    if (value === 'right') {
      if (amIOwner) {
        isMyKeyDown.current.right = true;
      } else {
        dataChannelRef.current?.send('DR');
      }
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;
    if (value === 'left') {
      if (amIOwner) {
        isMyKeyDown.current.left = false;
      } else {
        dataChannelRef.current?.send('UL');
      }
    }
    if (value === 'right') {
      if (amIOwner) {
        isMyKeyDown.current.right = false;
      } else {
        dataChannelRef.current?.send('UR');
      }
    }
  };

  return [
    ball,
    paddles,
    stageSize,
    isPlaying,
    count,
    handleMouseDown,
    handleMouseUp,
    result,
  ];
}

const paddleSize = {
  w: 0.2,
  h: 0.05,
};

const initialState = {
  ball: {
    x: 0.5,
    y: 0.5,
    r: 0.025,
    dx: 0.004,
    dy: 0.005,
  },
  paddles: {
    up: {
      x: 0.5 - paddleSize.w / 2,
      y: 0.1 - paddleSize.h,
      w: paddleSize.w,
      h: paddleSize.h,
    },
    down: {
      x: 0.5 - paddleSize.w / 2,
      y: 0.9,
      w: paddleSize.w,
      h: paddleSize.h,
    },
  },
};

const ballLimit = 1 - initialState.ball.r;

const paddleDeltaX = 0.01;
const paddleLimitX = 1 - paddleSize.w;
