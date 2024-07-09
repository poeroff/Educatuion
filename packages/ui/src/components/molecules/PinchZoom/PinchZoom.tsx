import { useState } from 'react';
import PinchZoomViewer from '../../atoms/PinchZoom/PinchZoomViewer';
import { PinchTooltip } from '../../atoms/PinchZoom/PinchTooltip';
import Style from './PinchZoom.style';
import { EPinchBtnType } from '@/type/PinchZoom/EPinchBtnType';

export interface IPinchZoomProps {
  children: React.ReactNode;
  pinchType?: EPinchBtnType;
  zIndex?: string;
}

export const PinchZoom = ({ children, pinchType = 'image', zIndex = '0' }: IPinchZoomProps) => {
  const [isViewerOpen, setIsViewerOpen] = useState<boolean>(false);

  const handleOpenViewer = () => {
    setIsViewerOpen(true);
  };

  const handleCloseViewer = () => {
    setIsViewerOpen(false);
  };

  return (
    <Style.ImageWrapper onClick={e => e.stopPropagation()}>
      {children}
      {!isViewerOpen && <PinchTooltip onClickTooltip={handleOpenViewer} pinchType={pinchType} disabled={isViewerOpen} zIndex={zIndex} />}
      {isViewerOpen && <PinchZoomViewer onClose={handleCloseViewer} children={children} />}
    </Style.ImageWrapper>
  );
};

export default PinchZoom;
