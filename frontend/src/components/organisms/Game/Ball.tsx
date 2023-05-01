import { Circle } from 'react-konva';

interface Props {
  x: number;
  y: number;
  r: number;
  color: string;
}

export default function Ball({ x, y, r, color }: Props) {
  return (
    <Circle
      x={x}
      y={y}
      radius={r}
      fill={color}
      shadowColor="rgba(61, 54, 54, 0.25)"
      shadowBlur={21}
    />
  );
}
