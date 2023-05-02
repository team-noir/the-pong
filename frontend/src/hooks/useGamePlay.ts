import { useContext, useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import * as api from 'api/socket.v1';
import konva from 'konva';
import useGameRTC from 'hooks/useGameRTC';
import { SocketContext } from 'contexts/socket';
import { GameResultType, GameType, PlayerType } from 'types';
import QUERY_KEYS from 'constants/queryKeys';
import SOCKET_EVENTS from 'constants/socketEvents';
import { GAME_KEY_EVENT } from 'constants/index';

type Return = [
  ball: typeof initialStateDefault.ball,
  paddles: typeof initialStateDefault.paddles,
  isPlaying: boolean,
  count: number | null,
  handleMouseDown: (e: React.MouseEvent<HTMLButtonElement>) => void,
  handleMouseUp: (e: React.MouseEvent<HTMLButtonElement>) => void,
  result: GameResultType | null
];

export default function useGamePlay(
  game: GameType,
  amIViewer: boolean,
  amIOwner: boolean | undefined,
  canvasRef: React.RefObject<konva.Layer>,
  videoRef: React.RefObject<HTMLVideoElement>,
  myPlayer: PlayerType | undefined,
  otherPlayer: PlayerType | undefined
): Return {
  const initialState = initialStates[game.mode];

  const [ball, setBall] = useState(initialState.ball);
  const [paddles, setPaddles] = useState(initialState.paddles);
  const [isPlaying, setIsPlaying] = useState(false);
  const [count, setCount] = useState(3);
  const [result, setResult] = useState<GameResultType | null>(null);
  const socket = useContext(SocketContext);
  const queryClient = useQueryClient();

  const countInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const drawInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const isMyKeyDown = useRef({ left: false, right: false });
  const isOtherKeyDown = useRef({ left: false, right: false });

  const [dataChannelRef] = useGameRTC(
    game.id,
    amIOwner,
    canvasRef,
    videoRef,
    isOtherKeyDown
  );

  useEffect(() => {
    setIsPlaying(!!game?.isPlaying);

    api.onPing();

    api.onGameStart(() => {
      if (countInterval.current) return;
      countInterval.current = setInterval(() => {
        setCount((prevState) => prevState - 1);
      }, 1000);
    });

    api.onGameViewer((data: { viewerCount: number }) => {
      queryClient.setQueryData<GameType>(
        [QUERY_KEYS.GAME, String(game.id)],
        (prevData) =>
          prevData && {
            ...prevData,
            viewerCount: data.viewerCount,
          }
      );
    });

    api.onRoundOver((data: { winnerId: number; score: number }) => {
      const { winnerId, score } = data;
      queryClient.setQueryData<GameType>(
        [QUERY_KEYS.GAME, String(game.id)],
        (prevData) =>
          prevData &&
          ({
            ...prevData,
            players: prevData.players.map((player) =>
              player.id === winnerId ? { ...player, score } : player
            ),
          } as GameType)
      );
    });

    api.onGameOver((data: GameResultType) => {
      setResult(data);
      setIsPlaying(false);
      queryClient.setQueryData<GameType>(
        [QUERY_KEYS.GAME, String(game.id)],
        (prevData) =>
          prevData &&
          ({
            ...prevData,
            players: prevData.players.map((player) =>
              player.id === data.winner.id ? data.winner : data.loser
            ),
          } as GameType)
      );
    });

    if (amIViewer) return;
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      socket.off(SOCKET_EVENTS.GAME.PING);
      socket.off(SOCKET_EVENTS.GAME.START);
      socket.off(SOCKET_EVENTS.GAME.VIEWER);
      socket.off(SOCKET_EVENTS.GAME.ROUND_OVER);
      socket.off(SOCKET_EVENTS.GAME.GAME_OVER);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      countInterval.current && clearInterval(countInterval.current);
      drawInterval.current && clearInterval(drawInterval.current);
    };
  }, []);

  useEffect(() => {
    if (count > 0) return;
    countInterval.current && clearInterval(countInterval.current);
    setIsPlaying(true);
  }, [count]);

  useEffect(() => {
    if (amIViewer || !amIOwner) return;
    if (myPlayer?.score === 11 || otherPlayer?.score === 11) {
      setIsPlaying(false);
    }
  }, [myPlayer?.score, otherPlayer?.score]);

  useEffect(() => {
    if (amIViewer || !amIOwner || !isPlaying) return;
    drawInterval.current = setInterval(draw, 10);
    return () => {
      drawInterval.current && clearInterval(drawInterval.current);
    };
  }, [ball, isPlaying]);

  const drawBall = () => {
    if (ball.y === ball.r || ball.y === ballLimit) {
      const player = ball.y === ball.r ? myPlayer : otherPlayer;
      player?.id && api.emitRoundOver(player.id);
      // NOTE: 점수를 얻은 플레이어가 먼저 서브
      setBall({
        ...initialState.ball,
        dy:
          player?.id === myPlayer?.id
            ? initialState.ball.dy
            : -initialState.ball.dy,
      });
      setPaddles(initialState.paddles);
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

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      if (amIOwner) {
        isMyKeyDown.current.left = true;
      } else {
        dataChannelRef.current?.send(GAME_KEY_EVENT.DOWN_LEFT);
      }
    }
    if (e.key === 'ArrowRight') {
      if (amIOwner) {
        isMyKeyDown.current.right = true;
      } else {
        dataChannelRef.current?.send(GAME_KEY_EVENT.DOWN_RIGHT);
      }
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      if (amIOwner) {
        isMyKeyDown.current.left = false;
      } else {
        dataChannelRef.current?.send(GAME_KEY_EVENT.UP_LEFT);
      }
    }
    if (e.key === 'ArrowRight') {
      if (amIOwner) {
        isMyKeyDown.current.right = false;
      } else {
        dataChannelRef.current?.send(GAME_KEY_EVENT.UP_RIGHT);
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;
    if (value === 'left') {
      if (amIOwner) {
        isMyKeyDown.current.left = true;
      } else {
        dataChannelRef.current?.send(GAME_KEY_EVENT.DOWN_LEFT);
      }
    }
    if (value === 'right') {
      if (amIOwner) {
        isMyKeyDown.current.right = true;
      } else {
        dataChannelRef.current?.send(GAME_KEY_EVENT.DOWN_RIGHT);
      }
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;
    if (value === 'left') {
      if (amIOwner) {
        isMyKeyDown.current.left = false;
      } else {
        dataChannelRef.current?.send(GAME_KEY_EVENT.UP_LEFT);
      }
    }
    if (value === 'right') {
      if (amIOwner) {
        isMyKeyDown.current.right = false;
      } else {
        dataChannelRef.current?.send(GAME_KEY_EVENT.UP_RIGHT);
      }
    }
  };

  return [
    ball,
    paddles,
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

const initialStateDefault = {
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

const speedRate = 2;

const initialStateSpeedy = {
  ...initialStateDefault,
  ball: {
    ...initialStateDefault.ball,
    dx: initialStateDefault.ball.dx * speedRate,
    dy: initialStateDefault.ball.dy * speedRate,
  },
};

const initialStateShortPaddle = {
  ...initialStateDefault,
  paddles: {
    up: {
      ...initialStateDefault.paddles.up,
      x: 0.5 - paddleSize.w / 4,
      w: paddleSize.w / 2,
    },
    down: {
      ...initialStateDefault.paddles.down,
      x: 0.5 - paddleSize.w / 4,
      w: paddleSize.w / 2,
    },
  },
};

const initialStates = [
  initialStateDefault,
  initialStateSpeedy,
  initialStateShortPaddle,
];

const ballLimit = 1 - initialStateDefault.ball.r;

const paddleDeltaX = 0.01;
const paddleLimitX = 1 - paddleSize.w;
