import React, { useCallback, useEffect, useState } from 'react';
import { StyledSvg } from './ArrowLine.style';

export interface IArrowLineProps {
  startRef: React.RefObject<HTMLElement>;
  endRef: React.RefObject<HTMLElement>;
  color: string;
  startArrow: boolean;
  endArrow: boolean;
  thickness: number;
  offsetX?: number;
  offsetY?: number;
  vLineLength?: number;
  cornerRadius?: number;
}

export const ArrowLine: React.FC<IArrowLineProps> = ({
  startRef,
  endRef,
  color,
  startArrow,
  endArrow,
  thickness,
  offsetX = 0,
  offsetY = 0,
  vLineLength = 10,
  cornerRadius = 0,
}) => {
  const [lineCoords, setLineCoords] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });

  const updateLineCoords = useCallback(() => {
    if (startRef.current && endRef.current) {
      const startRect = startRef.current.getBoundingClientRect();
      const endRect = endRef.current.getBoundingClientRect();

      const x1 = startRect.left + startRect.width / 2 + window.scrollX;
      const y1 = startRect.top + window.scrollY;
      const x2 = endRect.left + endRect.width / 2 + window.scrollX;
      const y2 = endRect.top + window.scrollY;

      setLineCoords({ x1, y1, x2, y2 });
    }
  }, [endRef, startRef]);

  useEffect(() => {
    const handleResize = () => {
      requestAnimationFrame(updateLineCoords);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize);
    };
  }, [updateLineCoords]);

  const { x1, y1, x2, y2 } = lineCoords;

  // 수직-수평-수직 라인의 중간 좌표 계산
  const middleY1 = y1 - vLineLength;
  const middleY2 = y2 - vLineLength;

  const arrowHead = (x: number, y: number, direction: 'up' | 'down' | 'left' | 'right') => {
    const size = thickness * 2;
    let points;
    switch (direction) {
      case 'up':
        points = `${x},${y} ${x - size},${y + size} ${x + size},${y + size}`;
        break;
      case 'down':
        points = `${x},${y} ${x - size},${y - size} ${x + size},${y - size}`;
        break;
      case 'left':
        points = `${x},${y} ${x + size},${y - size} ${x + size},${y + size}`;
        break;
      case 'right':
        points = `${x},${y} ${x - size},${y - size} ${x - size},${y + size}`;
        break;
    }
    return <polygon points={points} fill={color} />;
  };

  // Path 데이터 생성 (곡률 적용)
  const pathData = `
    M ${x1},${y1}
    V ${middleY1}
    Q ${x1},${middleY1 - cornerRadius} ${x1 + cornerRadius},${middleY1 - cornerRadius}
    H ${x2 - cornerRadius}
    Q ${x2},${middleY2 - cornerRadius} ${x2},${middleY2}
    V ${y2}
  `;

  return (
    <StyledSvg offsetX={offsetX} offsetY={offsetY}>
      <path d={pathData} stroke={color} strokeWidth={thickness} fill='none' />
      {startArrow && arrowHead(x1, y1, 'down')}
      {endArrow && arrowHead(x2, y2, 'down')}
    </StyledSvg>
  );
};

export default ArrowLine;
