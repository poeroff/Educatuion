import { useState } from 'react';
import styled from '@emotion/styled';
import ZoomInSVG from '@maidt-cntn/assets/customImage/zoom_in.svg';
import ZoomOutSVG from '@maidt-cntn/assets/customImage/zoom_out.svg';
import { SvgIcon } from '@maidt-cntn/ui';

export interface IImageModalProps {
  imageModalWidth?: string | number;
  imageModalHeight?: string | number;
  src: string | undefined;
  alt: string | undefined;
  isOpenModal?: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ImageModal = ({ imageModalWidth = '85%', imageModalHeight = '60%', src, alt, isOpenModal, setIsOpenModal }: IImageModalProps) => {
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);

  const initialState = {
    startX: 0,
    startY: 0,
    offsetX: 0,
    offsetY: 0,
  };
  const [coordinate, setCoordinate] = useState(initialState);

  const closeModal = () => {
    setIsOpenModal(false);
    resetPosition();
  };

  const resetPosition = () => {
    setScale(1);
    setCoordinate(initialState);
  };

  const zoomIn = () => {
    setScale(prev => prev + 0.1);
  };

  const zoomOut = () => {
    if (scale <= 0.1) return;

    setScale(prev => prev - 0.1);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setCoordinate(prev => ({
      ...prev,
      startX: event.clientX - prev.offsetX,
      startY: event.clientY - prev.offsetY,
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setCoordinate(prev => ({
      ...prev,
      offsetX: event.clientX - prev.startX,
      offsetY: event.clientY - prev.startY,
    }));
  };

  return (
    isOpenModal && (
      <>
        <BackgroundSection />
        <ModalWrapper onMouseUp={handleMouseUp}>
          <HeaderWrapper>
            <FileNameDiv>{src?.substring(src.lastIndexOf('/') + 1)}</FileNameDiv>
            <CloseButton type='button' onClick={closeModal}>
              닫기
            </CloseButton>
          </HeaderWrapper>
          <BodyWrapper>
            <ImageWrapper onMouseMove={handleMouseMove} width={imageModalWidth} height={imageModalHeight}>
              <Img
                onMouseDown={handleMouseDown}
                onDragStart={e => e.preventDefault()}
                src={src}
                alt={alt}
                scale={scale}
                left={coordinate.offsetX}
                top={coordinate.offsetY}
              />
            </ImageWrapper>
            <ControlWrapper>
              <Content type='button' onClick={zoomIn}>
                확대하기 <SvgIcon src={ZoomInSVG} title='확대하기' width='20px' height='20px' />
              </Content>
              <VerticalLine />
              <Content type='button' onClick={zoomOut}>
                축소하기 <SvgIcon src={ZoomOutSVG} title='축소하기' width='20px' height='20px' />
              </Content>
            </ControlWrapper>
          </BodyWrapper>
        </ModalWrapper>
      </>
    )
  );
};

export default ImageModal;

const BackgroundSection = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalWrapper = styled.section`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  z-index: 100;
  align-items: center;
`;

const HeaderWrapper = styled.div`
  background-color: var(--color-black);
  display: flex;
  width: 100%;
  height: 40px;
  align-items: center;
  justify-content: space-between;
  padding: 8px 80px;
  gap: 8px;
`;

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  gap: 24px;
`;

const FileNameDiv = styled.div`
  color: var(--color-white);
  font-weight: var(--font-weight-bold);
  font-size: 14px;
  width: 82%;
  line-height: 20px;
`;

const CloseButton = styled.button`
  background-color: transparent;
  color: var(--color-white);
  font-weight: var(--font-weight-bold);
  font-size: 14px;
  line-height: 20px;
  border: none;
  cursor: pointer;
`;

const ImageWrapper = styled.div<{ width: string | number; height: string | number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  background-color: #eff0f2;
`;

const Img = styled.img<{ scale: number; left: number; top: number }>`
  transform: ${({ scale }) => `scale(${1 + scale})`};
  translate: ${({ left, top }) => `${left}px ${top}px`};
  cursor: grab;
`;

const ControlWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 214px;
  height: 36px;
  background-color: var(--color-black);
  border-radius: 6px;
  padding: 8px 16px;
  gap: 3px;
`;

const Content = styled.button`
  cursor: pointer;

  display: flex;
  background-color: transparent;
  border: none;
  color: var(--color-white);
  font-weight: var(--font-weight-bold);
  font-size: 14px;
  line-height: 20px;
  gap: 7px;
  white-space: nowrap;
`;

const VerticalLine = styled.span`
  position: relative;
  height: 14px;
  width: 2px;
  background-color: var(--color-white);
`;
