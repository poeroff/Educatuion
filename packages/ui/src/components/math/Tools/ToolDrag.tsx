import { PropsWithChildren, useState } from 'react';
import Draggable, { DraggableData } from 'react-draggable';
import style from './ToolDrag.style';

interface IToolDragProps {
  zIndex: number;
  cancelClassName?: string;
  boundaryInfo?: TBoundaryInfo;
}

export type TBoundaryInfo = {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
};

export const ToolDrag = ({
  zIndex,
  cancelClassName,
  boundaryInfo = { left: 0, top: 0, right: 1080, bottom: 608 },
  children,
}: PropsWithChildren<IToolDragProps>) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleDrag = (data: DraggableData) => {
    setPosition({ x: data.x, y: data.y });
  };

  return (
    <Draggable
      bounds={boundaryInfo}
      position={{ x: position.x, y: position.y }}
      onDrag={(_, data) => handleDrag(data)}
      cancel={cancelClassName && `.${cancelClassName}`}
    >
      <style.Boundary zIndex={zIndex}>{children}</style.Boundary>
    </Draggable>
  );
};
