import { useContext, useEffect, useRef, useState } from 'react';
import { onAchievment } from 'api/socket.v1';
import { Stage, Layer, Image } from 'react-konva';
import konva from 'konva';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
} from '@heroicons/react/20/solid';
import { useUser } from 'hooks/useStore';
import useGamePlay from 'hooks/useGamePlay';
import { SocketContext } from 'contexts/socket';
import Ball from 'components/organisms/Game/Ball';
import Paddle from 'components/organisms/Game/Paddle';
import GameResultModal from 'components/organisms/Game/GameResultModal';
import GameScoretable from 'components/molecule/GameScoretable';
import AchievementModal from 'components/molecule/AchievementModal';
import Button from 'components/atoms/Button';
import { classNames } from 'utils';
import { AchievementType, GameType } from 'types';
import {
  BALL_COLOR,
  GAME_THEMES,
  MY_PADDLE_COLOR,
  OTHER_PADDLE_COLOR,
} from 'constants/index';
import SOCKET_EVENTS from 'constants/socketEvents';

interface Props {
  game: GameType;
}

export default function Game({ game }: Props) {
  const myUserId = useUser((state) => state.id);
  const [stageSize, setStageSize] = useState(0);
  const [achievements, setAchievements] = useState<AchievementType[] | null>(
    null
  );
  const [backgroundImage, setBackgroundImage] =
    useState<HTMLImageElement | null>(null);
  const socket = useContext(SocketContext);

  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<konva.Layer>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const amIViewer = !game.players.some((player) => player.id === myUserId);
  const myPlayer = game.players.find((player) => player.id === myUserId);
  const otherPlayer =
    myPlayer && game.players.find((player) => player.id !== myUserId);
  const amIOwner = myPlayer?.isOwner;

  const [
    ball,
    paddles,
    isPlaying,
    count,
    handleMouseDown,
    handleMouseUp,
    result,
  ] = useGamePlay(
    game,
    amIViewer,
    amIOwner,
    canvasRef,
    videoRef,
    myPlayer,
    otherPlayer
  );

  useEffect(() => {
    if (!amIOwner) return;
    const image = new window.Image();
    image.src = GAME_THEMES[game.theme].backgroundImage;
    image.onload = () => {
      setBackgroundImage(image);
    };
  }, []);

  useEffect(() => {
    handleScreenResize();
    window.addEventListener('resize', handleScreenResize);
    return () => window.removeEventListener('resize', handleScreenResize);
  }, [containerRef.current]);

  const handleScreenResize = () => {
    if (!containerRef.current) return;
    setStageSize(containerRef.current.clientWidth);
  };

  useEffect(() => {
    onAchievment((data: AchievementType) => {
      setAchievements((prev) => {
        if (prev) return [...prev, data];
        return [data];
      });
    });
    return () => {
      socket.off(SOCKET_EVENTS.GAME.ACHIEVMENT);
    };
  }, [socket]);

  const closeAchievement = (achievementId: number) => {
    setAchievements((prev) => {
      if (prev) {
        return prev.filter(
          (prevAchievement) => prevAchievement.id !== achievementId
        );
      }
      return null;
    });
  };

  return (
    <section ref={containerRef}>
      <div className="text-center">
        <GameScoretable
          player1={otherPlayer || game.players[0]}
          player2={myPlayer || game.players[1]}
          liveScore1={otherPlayer ? otherPlayer.score : game.players[0].score}
          liveScore2={myPlayer ? myPlayer.score : game.players[1].score}
          myUserId={myUserId}
          layout="horizontal"
        />
      </div>

      <div
        className="relative bg-black"
        style={{ width: `${stageSize}px`, height: `${stageSize}px` }}
      >
        {amIOwner ? (
          <Stage width={stageSize} height={stageSize}>
            <Layer>
              {backgroundImage && (
                <Image
                  image={backgroundImage}
                  width={stageSize}
                  height={stageSize}
                />
              )}
              <Ball
                x={ball.x * stageSize}
                y={ball.y * stageSize}
                r={ball.r * stageSize}
                color={BALL_COLOR}
              />
              <Paddle
                x={paddles.up.x * stageSize}
                y={paddles.up.y * stageSize}
                width={paddles.up.w * stageSize}
                height={paddles.up.h * stageSize}
                color={OTHER_PADDLE_COLOR}
              />
              <Paddle
                x={paddles.down.x * stageSize}
                y={paddles.down.y * stageSize}
                width={paddles.down.w * stageSize}
                height={paddles.down.h * stageSize}
                color={MY_PADDLE_COLOR}
              />
            </Layer>
          </Stage>
        ) : (
          <video
            ref={videoRef}
            className={classNames(
              'w-full h-full bg-black',
              !amIViewer && !amIOwner && '-scale-y-100'
            )}
            muted
            autoPlay
          />
        )}

        {!isPlaying && (
          <div className="flex flex-col vh-center  w-full h-full absolute top-0 bg-black/50 gap-y-8">
            <h1 className="text-6xl">Ready</h1>
            <p className="text-4xl">{count}</p>
            <div>
              <h2 className="text-center text-xl mb-2">조작 안내</h2>
              <ul className="flex flex-col ">
                <li>1. 키보드 좌우 버튼</li>
                <li>
                  2. 아래 <ChevronLeftIcon className="inline-block w-5" />
                  <ChevronRightIcon className="inline-block w-5" /> 버튼
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {!amIViewer && (
        <div className="flex justify-center gap-2 mt-2">
          <Button
            value="left"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            className="w-20 h-20"
            primary
          >
            <ChevronLeftIcon />
          </Button>
          <Button
            value="right"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            className="w-20 h-20"
            primary
          >
            <ChevronRightIcon />
          </Button>
        </div>
      )}

      {/* NOTE: 내가 아닌 회원들에게 보이는 비디오를 스트리밍하는 캔버스 */}
      {amIOwner && (
        <div
          className="relative bg-black hidden"
          style={{ width: `${stageSize}px`, height: `${stageSize}px` }}
        >
          <Stage width={stageSize} height={stageSize}>
            <Layer ref={canvasRef}>
              {backgroundImage && (
                <Image
                  y={stageSize}
                  image={backgroundImage}
                  width={stageSize}
                  height={stageSize}
                  scaleY={-1}
                />
              )}
              <Ball
                x={ball.x * stageSize}
                y={ball.y * stageSize}
                r={ball.r * stageSize}
                color={BALL_COLOR}
              />
              <Paddle
                x={paddles.up.x * stageSize}
                y={paddles.up.y * stageSize}
                width={paddles.up.w * stageSize}
                height={paddles.up.h * stageSize}
                color={MY_PADDLE_COLOR}
              />
              <Paddle
                x={paddles.down.x * stageSize}
                y={paddles.down.y * stageSize}
                width={paddles.down.w * stageSize}
                height={paddles.down.h * stageSize}
                color={OTHER_PADDLE_COLOR}
              />
            </Layer>
          </Stage>
        </div>
      )}

      <div className="inline-flex items-center py-1 text-s text-gray-light float-right">
        <EyeIcon className="block h-4 w-4" aria-hidden="true" />
        <span className="ml-1">{game.viewerCount}</span>
      </div>

      {result && <GameResultModal result={result} />}

      {achievements &&
        achievements.map((achievement) => (
          <AchievementModal
            key={achievement.id}
            achievement={achievement}
            onClickClose={() => {
              closeAchievement(achievement.id);
            }}
          />
        ))}
    </section>
  );
}
