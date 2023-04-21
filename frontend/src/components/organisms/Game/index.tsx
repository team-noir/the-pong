import { useEffect, useRef, useState } from 'react';
import { Stage, Layer } from 'react-konva';
import Ball from 'components/organisms/Game/Ball';
import Paddle from 'components/organisms/Game/Paddle';
import GameScoretable from 'components/molecule/GameScoretable';
import { GameType } from 'types';
import { useUser } from 'hooks/useStore';
import Button from 'components/atoms/Button';

interface Props {
  game: GameType;
}

const stageSize = {
  width: 500,
  height: 500,
};

const ballRadius = 10;
const ballLimitX = stageSize.width - ballRadius;
const ballLimitY = stageSize.height - ballRadius;

const paddleSize = {
  width: 100,
  height: 25,
};
const paddleDeltaX = 7;
const paddleLimitX = stageSize.width - paddleSize.width;

const initialState = {
  ball: {
    x: stageSize.width / 2,
    y: stageSize.height / 2,
  },
  paddleUp: {
    x: stageSize.width / 2 - paddleSize.width / 2,
    y: paddleSize.height,
  },
  paddleDown: {
    x: stageSize.width / 2 - paddleSize.width / 2,
    y: stageSize.height - paddleSize.height * 2,
  },
  ballDelta: { x: 3, y: 2 },
};

export default function Game({ game }: Props) {
  const myUserId = useUser((state) => state.id);
  const [ball, setBall] = useState(initialState.ball);
  const [paddleUp, setPaddleUp] = useState(initialState.paddleUp);
  const [paddleDown, setPaddleDown] = useState(initialState.paddleDown);
  const [ballDelta, setBallDelta] = useState(initialState.ballDelta);
  const [score, setScore] = useState({ up: 0, down: 0 });
  const [isEnd, setIsEnd] = useState(false);

  const isKeyDown = useRef({ left: false, right: false });
  const animationFrame = useRef<number | null>(null);

  const upPlayer = game.players.find((player) => player.id !== myUserId);
  const downPlayer = game.players.find((player) => player.id === myUserId);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (score.up === 11 || score.down === 11) {
      setIsEnd(true);
    } else {
      setBall(initialState.ball);
      setPaddleUp(initialState.paddleUp);
      setPaddleDown(initialState.paddleDown);
      setBallDelta(initialState.ballDelta);
    }
  }, [score]);

  useEffect(() => {
    if (isEnd) return;
    animationFrame.current = requestAnimationFrame(draw);
    return () => {
      if (!animationFrame.current) return;
      cancelAnimationFrame(animationFrame.current);
    };
  }, [ball]);

  const drawBall = () => {
    if (ball.y === ballRadius || ball.y === ballLimitY) {
      ball.y === ballRadius
        ? setScore((prevState) => ({ ...prevState, down: prevState.down + 1 }))
        : setScore((prevState) => ({ ...prevState, up: prevState.up + 1 }));
      return;
    }

    let dx = ballDelta.x;
    let dy = ballDelta.y;
    let ballX = ball.x + dx;
    let ballY = ball.y + dy;

    const isUp = ballY <= paddleUp.y + paddleSize.height + ballRadius;
    const isDown = ballY >= paddleDown.y - ballRadius;
    const paddle = isDown ? paddleDown : paddleUp;
    const isBetweenPaddleX =
      ballX >= paddle.x - ballRadius &&
      ballX <= paddle.x + paddleSize.width + ballRadius;
    if ((isUp || isDown) && isBetweenPaddleX) {
      if (
        ballY >= paddle.y - ballRadius &&
        ballY <= paddle.y + dy - ballRadius
      ) {
        ballY = paddle.y - ballRadius;
      } else {
        ballX =
          ballX < paddle.x + paddleSize.width / 2
            ? paddle.x - ballRadius
            : paddle.x + paddleSize.width + ballRadius;
        if (ballX <= ballRadius || ballX >= ballLimitX) {
          ballY = isUp
            ? paddle.y + paddleSize.height + ballRadius
            : paddle.y - ballRadius;
        }
        dx = -dx;
      }
      dy = -dy;
    }

    if (ballX <= ballRadius) ballX = ballRadius;
    if (ballX >= ballLimitX) ballX = ballLimitX;
    if (ballY <= ballRadius) ballY = ballRadius;
    if (ballY >= ballLimitY) ballY = ballLimitY;

    if (ballX === ballRadius || ballX === ballLimitX) {
      dx = -dx;
    }

    setBall({
      x: ballX,
      y: ballY,
    });
    setBallDelta({
      x: dx,
      y: dy,
    });
  };

  const drawPaddleUp = () => {
    // TODO: 상대편 패들 움직이기
  };

  const drawPaddleDown = () => {
    if (isKeyDown.current.left) {
      const nextX = paddleDown.x - paddleDeltaX;
      setPaddleDown((prevState) => ({
        ...prevState,
        x: nextX < 0 ? 0 : nextX,
      }));
    }
    if (isKeyDown.current.right) {
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

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      isKeyDown.current.left = true;
    }
    if (e.key === 'ArrowRight') {
      isKeyDown.current.right = true;
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      isKeyDown.current.left = false;
    }
    if (e.key === 'ArrowRight') {
      isKeyDown.current.right = false;
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;
    if (value === 'left') {
      isKeyDown.current.left = true;
    }
    if (value === 'right') {
      isKeyDown.current.right = true;
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;
    if (value === 'left') {
      isKeyDown.current.left = false;
    }
    if (value === 'right') {
      isKeyDown.current.right = false;
    }
  };

  return (
    <section>
      <div>
        <div>
          {upPlayer && downPlayer && (
            <GameScoretable
              player1={upPlayer}
              player2={downPlayer}
              liveScore1={score.up}
              liveScore2={score.down}
            />
          )}
        </div>
      </div>
      <div style={{ backgroundColor: 'white', width: `${stageSize.width}px` }}>
        <Stage width={stageSize.width} height={stageSize.height}>
          <Layer>
            <Ball x={ball.x} y={ball.y} r={ballRadius} color={'black'} />
            <Paddle
              x={paddleUp.x}
              y={paddleUp.y}
              width={paddleSize.width}
              height={paddleSize.height}
              color="red"
            />
            <Paddle
              x={paddleDown.x}
              y={paddleDown.y}
              width={paddleSize.width}
              height={paddleSize.height}
              color="green"
            />
          </Layer>
        </Stage>
      </div>
      <div>
        <Button
          value="left"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          &lt;
        </Button>
        <Button
          value="right"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          &gt;
        </Button>
      </div>
      <div>{game.viewerCount}명 관전중</div>
    </section>
  );
}
