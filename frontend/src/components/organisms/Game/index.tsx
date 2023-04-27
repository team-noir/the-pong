import { useRef } from 'react';
import { Stage, Layer } from 'react-konva';
import konva from 'konva';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
} from '@heroicons/react/20/solid';
import { useUser } from 'hooks/useStore';
import useGamePlay from 'hooks/useGamePlay';
import Ball from 'components/organisms/Game/Ball';
import Paddle from 'components/organisms/Game/Paddle';
import GameResultModal from 'components/organisms/Game/GameResultModal';
import GameScoretable from 'components/molecule/GameScoretable';
import Button from 'components/atoms/Button';
import { classNames } from 'utils';
import { GameType } from 'types';

interface Props {
  game: GameType;
}

export default function Game({ game }: Props) {
  const myUserId = useUser((state) => state.id);
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
    stageSize,
    isPlaying,
    count,
    handleMouseDown,
    handleMouseUp,
    result,
  ] = useGamePlay(
    game.id,
    amIViewer,
    amIOwner,
    containerRef,
    canvasRef,
    videoRef,
    myPlayer,
    otherPlayer
  );

  return (
    <section ref={containerRef}>
      <div className="text-center">
        <GameScoretable
          player1={otherPlayer || game.players[0]}
          player2={myPlayer || game.players[1]}
          liveScore1={otherPlayer ? otherPlayer.score : game.players[0].score}
          liveScore2={myPlayer ? myPlayer.score : game.players[1].score}
        />
      </div>
      <div
        className="relative bg-white"
        style={{ width: `${stageSize}px`, height: `${stageSize}px` }}
      >
        {amIOwner ? (
          <Stage width={stageSize} height={stageSize}>
            <Layer ref={canvasRef}>
              <Ball
                x={ball.x * stageSize}
                y={ball.y * stageSize}
                r={ball.r * stageSize}
                color="black"
              />
              <Paddle
                x={paddles.up.x * stageSize}
                y={paddles.up.y * stageSize}
                width={paddles.up.w * stageSize}
                height={paddles.up.h * stageSize}
                color="red"
              />
              <Paddle
                x={paddles.down.x * stageSize}
                y={paddles.down.y * stageSize}
                width={paddles.down.w * stageSize}
                height={paddles.down.h * stageSize}
                color="green"
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
      <div className="inline-flex items-center py-1 text-s text-gray-light float-right">
        <EyeIcon className="block h-4 w-4" aria-hidden="true" />
        <span className="ml-1">{game.viewerCount}</span>
      </div>
      {result && <GameResultModal result={result} />}
    </section>
  );
}
