import { Rect } from 'react-konva';

interface Props {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

export default function Paddle({ x, y, width, height, color }: Props) {
  return (
    <Rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={color}
      shadowColor="rgba(61, 54, 54, 0.25)"
      shadowBlur={21}
    />
  );
}
