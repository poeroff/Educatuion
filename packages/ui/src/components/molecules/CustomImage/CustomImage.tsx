import styled from '@emotion/styled';
import { useState } from 'react';
import { Tooltip, ImageModal, IImageModalProps } from '@maidt-cntn/ui';

interface ICustomImageProps extends IImageModalProps {
  width?: string | number;
  height?: string | number;
}

export const CustomImage = ({
  width = '100%',
  height = '100%',
  imageModalWidth = '85%',
  imageModalHeight = '60%',
  src = '',
  alt = '이미지 설명',
}: ICustomImageProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <ImageWrapper width={width} height={height}>
        <img src={src} alt={alt} />
        <Tooltip onClickTooltip={() => setIsOpenModal(true)} />
      </ImageWrapper>
      <ImageModal
        imageModalWidth={imageModalWidth}
        imageModalHeight={imageModalHeight}
        src={src}
        alt={alt}
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
      />
    </>
  );
};

const ImageWrapper = styled.div<{ width: string | number; height: string | number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: #eff0f2;
  border-radius: 8px;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    aspect-ratio: 1/1;
  }
`;
