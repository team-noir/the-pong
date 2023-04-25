import { useContext, useEffect, useRef, useState } from 'react';
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
  ball: { x: number; y: number; r: number },
  paddleUp: { x: number; y: number; w: number; h: number },
  paddleDown: { x: number; y: number; w: number; h: number },
  stageSize: number,
  isPlaying: boolean,
  count: number | null,
  handleMouseDown: (e: React.MouseEvent<HTMLButtonElement>) => void,
  handleMouseUp: (e: React.MouseEvent<HTMLButtonElement>) => void,
  result: GameResultType | null
];

export default function useGamePlay(
  amIViewer: boolean,
  amIOwner: boolean | undefined,
  sectionRef: React.RefObject<HTMLElement>,
  myPlayer?: PlayerType,
  otherPlayer?: PlayerType
): ReturnType {
  const [ball, setBall] = useState(initialState.ball);
  const [paddleUp, setPaddleUp] = useState(initialState.paddleUp);
  const [paddleDown, setPaddleDown] = useState(initialState.paddleDown);
  const [ballDelta, setBallDelta] = useState(initialState.ballDelta);
  const [isPlaying, setIsPlaying] = useState(false);
  const [count, setCount] = useState(3);
  const [stageSize, setStageSize] = useState(0);
  const [result, setResult] = useState<GameResultType | null>(null);
  const socket = useContext(SocketContext);

  const interval = useRef<NodeJS.Timer | null>(null);
  const animationFrame = useRef<number | null>(null);
  const isMyKeyDown = useRef({ left: false, right: false });
  const isOtherKeyDown = useRef({ left: false, right: false });

  useEffect(() => {
    // TODO: 아래 테스트용 코드 지우기
    // setResult(dummyResult);
    socket.on('gameStart', () => {
      interval.current = setInterval(
        () => setCount((prevState) => prevState - 1),
        1000
      );
      return () => {
        interval.current && clearInterval(interval.current!);
      };
    });
    socket.on('gameScore', (data: PlayerType) => {
      // TODO: 게임 쿼리 수정
      // setGame((prev) => ({
      //   ...prev,
      //   players: prev.players.map((player) =>
      //     player.id === data.id ? { ...player, score: data.score } : player
      //   ),
      // }));
    });
    socket.on('gameResult', (data: GameResultType) => {
      setResult(data);
    });

    if (amIViewer) return;
    socket.on('ping', () => {
      socket.emit('pong');
    });
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      socket.off('ping');
      socket.off('gameScore');
      socket.off('gameResult');
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (count > 0) return;
    clearInterval(interval.current!);
    setIsPlaying(true);
  }, [count]);

  useEffect(() => {
    handleScreenResize();
    window.addEventListener('resize', handleScreenResize);
    return () => window.removeEventListener('resize', handleScreenResize);
  }, [sectionRef.current]);

  useEffect(() => {
    if (amIViewer || !amIOwner) return;
    if (myPlayer?.score === 11 || otherPlayer?.score === 11) {
      setIsPlaying(false);
    } else {
      setBall(initialState.ball);
      setPaddleUp(initialState.paddleUp);
      setPaddleDown(initialState.paddleDown);
      setBallDelta(initialState.ballDelta);
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
      socket.emit('gameScore', {
        player: {
          id: player?.id,
          score: player?.score && player.score + 1,
        },
      });
      return;
    }

    let dx = ballDelta.x;
    let dy = ballDelta.y;
    let ballX = ball.x + dx;
    let ballY = ball.y + dy;

    const isUp = ballY <= paddleUp.y + paddleSize.h + ball.r;
    const isDown = ballY >= paddleDown.y - ball.r;
    const paddle = isDown ? paddleDown : paddleUp;
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
    }));
    setBallDelta({
      x: dx,
      y: dy,
    });
  };

  const drawPaddleUp = () => {
    if (isOtherKeyDown.current.left) {
      const nextX = paddleUp.x - paddleDeltaX;
      setPaddleUp((prevState) => ({
        ...prevState,
        x: nextX < 0 ? 0 : nextX,
      }));
    }
    if (isOtherKeyDown.current.right) {
      const nextX = paddleUp.x + paddleDeltaX;
      setPaddleUp((prevState) => ({
        ...prevState,
        x: nextX > paddleLimitX ? paddleLimitX : nextX,
      }));
    }
  };

  const drawPaddleDown = () => {
    if (isMyKeyDown.current.left) {
      const nextX = paddleDown.x - paddleDeltaX;
      setPaddleDown((prevState) => ({
        ...prevState,
        x: nextX < 0 ? 0 : nextX,
      }));
    }
    if (isMyKeyDown.current.right) {
      const nextX = paddleDown.x + paddleDeltaX;
      setPaddleDown((prevState) => ({
        ...prevState,
        x: nextX > paddleLimitX ? paddleLimitX : nextX,
      }));
    }
  };

  const draw = () => {
    drawPaddleUp();
    drawPaddleDown();
    drawBall();
  };

  const handleScreenResize = () => {
    if (!sectionRef.current) return;
    setStageSize(sectionRef.current.clientWidth);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      if (amIOwner) {
        isMyKeyDown.current.left = true;
      } else {
        // TODO: keydown 이벤트 보내기
      }
    }
    if (e.key === 'ArrowRight') {
      if (amIOwner) {
        isMyKeyDown.current.right = true;
      } else {
        // TODO: keydown 이벤트 보내기
      }
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      if (amIOwner) {
        isMyKeyDown.current.left = false;
      } else {
        // TODO: keydown 이벤트 보내기
      }
    }
    if (e.key === 'ArrowRight') {
      if (amIOwner) {
        isMyKeyDown.current.right = false;
      } else {
        // TODO: keydown 이벤트 보내기
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;
    if (value === 'left') {
      if (amIOwner) {
        isMyKeyDown.current.left = true;
      } else {
        // TODO: keydown 이벤트 보내기
      }
    }
    if (value === 'right') {
      if (amIOwner) {
        isMyKeyDown.current.right = true;
      } else {
        // TODO: keydown 이벤트 보내기
      }
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;
    if (value === 'left') {
      if (amIOwner) {
        isMyKeyDown.current.left = false;
      } else {
        // TODO: keydown 이벤트 보내기
      }
    }
    if (value === 'right') {
      if (amIOwner) {
        isMyKeyDown.current.right = false;
      } else {
        // TODO: keydown 이벤트 보내기
      }
    }
  };

  return [
    ball,
    paddleUp,
    paddleDown,
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
  },
  paddleUp: {
    x: 0.5 - paddleSize.w / 2,
    y: 0.1 - paddleSize.h,
    w: paddleSize.w,
    h: paddleSize.h,
  },
  paddleDown: {
    x: 0.5 - paddleSize.w / 2,
    y: 0.9,
    w: paddleSize.w,
    h: paddleSize.h,
  },
  ballDelta: { x: 0.003, y: 0.004 },
};

const ballLimit = 1 - initialState.ball.r;

const paddleDeltaX = 0.01;
const paddleLimitX = 1 - paddleSize.w;
