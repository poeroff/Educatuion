import Stroke2px from '@maidt-cntn/assets/drawing/thickness_2px.svg';
import Stroke5px from '@maidt-cntn/assets/drawing/thickness_5px.svg';
import Stroke8px from '@maidt-cntn/assets/drawing/thickness_8px.svg';
import Stroke2pxActive from '@maidt-cntn/assets/drawing/thickness_2px_active.svg';
import Stroke5pxActive from '@maidt-cntn/assets/drawing/thickness_5px_active.svg';
import Stroke8pxActive from '@maidt-cntn/assets/drawing/thickness_8px_active.svg';

export interface PositionProps {
  top: number;
  left: number;
  yPosition: number;
}
export interface IEraserModalProps extends PositionProps {
  eraserSize: number;
  isExistDrawing: boolean;
  setEraserSize: (eraserSize: number) => void;
  setIsEraserModalOpen: (isEraserModalOpen: boolean) => void;
  setIsAlertOpen: Function;
}

export interface IPenModalProps extends PositionProps {
  penSize: number;
  penColor: string;
  isLine: boolean;
  setPenSize: (newSize: number) => void;
  setPenColor: (newColor: string) => void;
  setIsLine: (isLine: boolean) => void;
  setIsPenModalOpen: (isOpen: boolean) => void;
}

export const DRAWING_PEN_COLORS: Array<string> = ['#47494D', '#0091ff', '#FE5663', '#FFB400', '#1EAA58'];

export interface StrokeType {
  src: string;
  activeSrc: string;
  stroke: number;
}

export const DRAWING_PEN_STROKES: Array<StrokeType> = [
  { src: Stroke2px, activeSrc: Stroke2pxActive, stroke: 2 },
  { src: Stroke5px, activeSrc: Stroke5pxActive, stroke: 5 },
  { src: Stroke8px, activeSrc: Stroke8pxActive, stroke: 8 },
];

export interface IDrawingBackgroundImageProps {
  src: string;
  alt: string;
}

export interface IDrawingProps {
  image?: IDrawingBackgroundImageProps;
  width?: string;
  height?: string;
  useBorder?: boolean;
  disabled?: boolean;
  tmpSave?: () => void;
  ariaLabel?: string;
}
