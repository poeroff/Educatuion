import { MouseEvent, PropsWithChildren } from 'react';
import { PinchZoom, Image } from '@maidt-cntn/ui';

type Point = {
  x: number;
  y: number;
  id: string;
};

type Props = {
  leftPoints: Point[];
  rightPoints: Point[];
  id: string;
  isComplete: boolean;
  dotPosition?: 'left' | 'right';
  circleId: string;
  clickedPointId: string;
  img?: { src: string; alt: string };
  imgMode?: boolean;
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
  isComplete,
  img,
  imgMode,
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
      <div>
        {imgMode && (
          <div style={{ height: '120px', width: '136px' }}>
            <PinchZoom>
              {img !== undefined && <Image src={img.src} alt={img.alt} style={{ borderRadius: '8px' }} height='120px' width='136px' />}
            </PinchZoom>
          </div>
        )}

        <div style={{ textAlign: 'center' }}>{children}</div>
      </div>

      {
        //<svg style={{ position: 'relative', zIndex: '0', left: isLeft ? '15px' : '-15px' }} width='10px' height='10px' viewBox='-5 -5 10 10'>
      }
      <svg width='10px' height='10px' viewBox='-5 -5 10 10' style={{ position: 'relative', zIndex: '1' }}>
        <circle
          key={id}
          className='drag-point'
          strokeWidth={5}
          r={5}
          fill='black'
          style={clickedPointId === currentPoint?.id ? { fill: '#1E78FF' } : { fill: 'black' }}
          onMouseDown={e => !isComplete && onDragStart(e, currentPoint ?? { id: '', x: 0, y: 0 })}
        />
      </svg>
    </div>
  );
};

export default ItemWithDot;
