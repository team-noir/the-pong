import { useRef } from 'react';
import { Stage, Layer } from 'react-konva';
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
  const sectionRef = useRef<HTMLElement>(null);

  const amIViewer = !game.players.some((player) => player.id === myUserId);
  const myPlayer = game.players.find((player) => player.id === myUserId);
  const otherPlayer = game.players.find((player) => player.id !== myUserId);
  const amIOwner = !amIViewer && myPlayer?.isOwner;

  const [
    ball,
    paddleUp,
    paddleDown,
    stageSize,
    handleMouseDown,
    handleMouseUp,
    result,
  ] = useGamePlay(amIViewer, amIOwner, sectionRef, myPlayer, otherPlayer);

  return (
    <section ref={sectionRef}>
      <div>
        <div>
          <GameScoretable
            player1={otherPlayer || game.players[0]}
            player2={myPlayer || game.players[1]}
            liveScore1={otherPlayer ? otherPlayer.score : game.players[0].score}
            liveScore2={myPlayer ? myPlayer.score : game.players[1].score}
          />
        </div>
      </div>
      <div
        className="bg-white"
        style={{ width: `${stageSize}px`, height: `${stageSize}px` }}
      >
        {amIOwner ? (
          <Stage width={stageSize} height={stageSize}>
            <Layer>
              <Ball
                x={ball.x * stageSize}
                y={ball.y * stageSize}
                r={ball.r * stageSize}
                color="black"
              />
              <Paddle
                x={paddleUp.x * stageSize}
                y={paddleUp.y * stageSize}
                width={paddleUp.w * stageSize}
                height={paddleUp.h * stageSize}
                color="red"
              />
              <Paddle
                x={paddleDown.x * stageSize}
                y={paddleDown.y * stageSize}
                width={paddleDown.w * stageSize}
                height={paddleDown.h * stageSize}
                color="green"
              />
            </Layer>
          </Stage>
        ) : (
          <video
            className={classNames(
              'w-full h-full bg-black',
              !amIViewer && !amIOwner && '-scale-y-100'
            )}
            muted
            autoPlay
          />
        )}
      </div>
      {!amIViewer && (
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
      )}
      <div>{game.viewerCount}명 관전중</div>
      {result && <GameResultModal result={result} />}
    </section>
  );
}
