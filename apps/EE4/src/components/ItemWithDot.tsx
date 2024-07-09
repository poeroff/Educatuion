import { MouseEvent, PropsWithChildren } from 'react';

type Point = {
  x: number;
  y: number;
  id: string;
};

type Props = {
  leftPoints: Point[];
  rightPoints: Point[];
  id: string;
  dotPosition?: 'left' | 'right';
  circleId: string;
  clickedPointId: string;
  onDragStart: (e: MouseEvent<SVGCircleElement>, point: Point) => void;
};

const ItemWithDot = ({
  leftPoints,
  rightPoints,
  id,
  dotPosition = 'right',
  circleId = '',
  clickedPointId,
  onDragStart,
  children,
}: PropsWithChildren<Props>) => {
  const isLeft = circleId.includes('left');
  const currentPoint = isLeft ? leftPoints.find(el => el.id === circleId) : rightPoints.find(el => el.id === circleId);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: dotPosition === 'right' ? 'row' : 'row-reverse',
        alignItems: 'center',
        gap: '28px',
        width: 'fit-content',
      }}
    >
      {children}

      <svg width='10px' height='10px' viewBox='-5 -5 10 10'>
        <circle
          key={id}
          className='drag-point'
          strokeWidth={5}
          r={5}
          fill='black'
          style={clickedPointId === currentPoint?.id ? { fill: '#1E78FF' } : { fill: 'black' }}
          onMouseDown={e => onDragStart(e, currentPoint ?? { id: '', x: 0, y: 0 })}
        />
      </svg>
    </div>
  );
};

export default ItemWithDot;
