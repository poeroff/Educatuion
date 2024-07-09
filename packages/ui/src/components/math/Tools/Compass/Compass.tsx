import React, { useRef, useState, useEffect } from 'react';
import Style from './Compass.style';
import { ITools } from '../Tools';
import { ToolButtonBar } from '../ToolButtonBar';
import { SvgIcon } from '@maidt-cntn/ui';
import PointerSVG from '../assets/pointer.svg';

interface Point {
  x: number;
  y: number;
}

interface Circle {
  center: Point;
  radius: number;
  startAngle: number;
  endAngle: number;
  clockwise: boolean;
}

interface ICompassProps {
  show: boolean;
}

export const Compass = ({ setShow, zIndex, show }: ITools & ICompassProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentAngle, setCurrentAngle] = useState<number | null>(null);
  const [startAngle, setStartAngle] = useState<number | null>(null);
  const [drawnCircles, setDrawnCircles] = useState<Circle[]>([]);
  const [clockwise, setClockwise] = useState(true);

  useEffect(() => {
    const handleTouchMove = (moveEvent: TouchEvent) => {
      if (moveEvent.cancelable) moveEvent.preventDefault();
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => document.removeEventListener('touchmove', handleTouchMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    canvas.width = 1080;
    canvas.height = 608;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';

    points.forEach((point, index) => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 7.5, 0, 2 * Math.PI);
      if (index === 1) {
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.stroke();
      }
      ctx.fill();
      ctx.setLineDash([]);
    });

    if (points.length === 2) {
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      ctx.lineTo(points[1].x, points[1].y);
      ctx.strokeStyle = 'black';
      ctx.setLineDash([3, 2]);
      ctx.stroke();
    }

    drawnCircles.forEach(({ center, radius, startAngle, endAngle, clockwise }) => {
      ctx.beginPath();
      ctx.arc(center.x, center.y, radius, startAngle, endAngle, clockwise);
      ctx.strokeStyle = 'black';
      ctx.setLineDash([]);
      ctx.stroke();
    });

    if (isDrawing && points.length === 2) {
      const startPoint = points[0];
      const currentPoint = points[1];
      const radius = Math.sqrt(Math.pow(currentPoint.x - startPoint.x, 2) + Math.pow(currentPoint.y - startPoint.y, 2));

      ctx.beginPath();
      ctx.arc(startPoint.x, startPoint.y, radius, 0, 2 * Math.PI);
      ctx.strokeStyle = '#C0C5CC';
      ctx.setLineDash([]);
      ctx.stroke();

      if (currentAngle !== null && startAngle !== null) {
        ctx.beginPath();
        ctx.arc(startPoint.x, startPoint.y, radius, startAngle, currentAngle, clockwise);
        ctx.strokeStyle = '#1E6EFA';
        ctx.stroke();

        const endX = startPoint.x + radius * Math.cos(currentAngle);
        const endY = startPoint.y + radius * Math.sin(currentAngle);

        ctx.beginPath();
        ctx.arc(endX, endY, 7.5, 0, 2 * Math.PI);
        ctx.fillStyle = '#1E6EFA';
        ctx.strokeStyle = '#1E6EFA';
        ctx.fill();
        ctx.stroke();
      }
    }
  }, [points, isDrawing, drawnCircles, currentAngle, startAngle, clockwise]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (!isDrawing) {
      if (points.length === 0) setPoints([{ x, y }]);
      else if (points.length === 1) setPoints([...points, { x, y }]);
      else setPoints([]);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (isDrawing && points.length === 2) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
      const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
      const startPoint = points[0];
      const angle = Math.atan2(y - startPoint.y, x - startPoint.x);

      let correctedAngle = angle >= 0 ? angle : 2 * Math.PI + angle;

      if (correctedAngle < startAngle!) correctedAngle += 2 * Math.PI;

      setCurrentAngle(correctedAngle);

      const deltaX = x - startPoint.x;
      const deltaY = y - startPoint.y;
      const crossProduct = deltaX * (y - startPoint.y) - deltaY * (x - startPoint.x);

      setClockwise(crossProduct < 0);

      if (correctedAngle - (startAngle || 0) >= 2 * Math.PI) handleMouseUp();
    }
  };

  const handleMouseDown = () => {
    if (points.length === 2) {
      setIsDrawing(true);
      const startPoint = points[0];
      const endPoint = points[1];
      const angle = Math.atan2(endPoint.y - startPoint.y, endPoint.x - startPoint.x);
      const correctedAngle = angle >= 0 ? angle : 2 * Math.PI + angle;
      setStartAngle(correctedAngle);
    }
  };

  const handleMouseUp = () => {
    if (isDrawing) {
      setIsDrawing(false);
      const startPoint = points[0];
      const endPoint = points[1];
      const radius = Math.sqrt(Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2));
      const endAngle = currentAngle || 0;
      setDrawnCircles([...drawnCircles, { center: startPoint, radius, startAngle: startAngle || 0, endAngle, clockwise }]);

      setCurrentAngle(null);
      setStartAngle(null);
    }
  };

  const handleDeleteButton = () => {};

  const handleClearButton = () => {
    setDrawnCircles([]);
    setPoints([]);
  };

  const handleSelectButton = (index: number) => {};

  useEffect(() => {
    if (!canvasRef.current) return;

    canvasRef.current.style.pointerEvents = show ? 'auto' : 'none';
  }, [show]);

  return (
    <Style.CanvasContainer>
      <Style.Canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      />
      {show && (
        <ToolButtonBar onDelete={handleDeleteButton}>
          <Style.ClearButton onClick={handleClearButton}>모두 삭제</Style.ClearButton>
          <Style.SelectButton onClick={() => handleSelectButton}>
            <SvgIcon src={PointerSVG} width='20px' height='20px' />
            개체 선택
          </Style.SelectButton>
        </ToolButtonBar>
      )}
    </Style.CanvasContainer>
  );
};

export default Compass;
