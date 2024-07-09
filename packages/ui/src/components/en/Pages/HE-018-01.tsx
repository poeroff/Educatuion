import styled from '@emotion/styled';
import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  EImageType,
  EStyleButtonTypes,
  EStyleFontSizes,
  EStyleSizes,
  IAudioPlayerProps,
  Image,
  IQuestionProps,
  PinchZoom,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

export interface IHE01801 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo?: IQuestionProps;
  audioInfo?: IAudioPlayerProps;
  dialogInfo: IHE01801DialogInfo;
  imgInfo: IHE01801ImgInfo;
}

export interface IHE01801DialogInfo {
  textTitle: string;
  textContent: string;
  subtitleIndexes?: Set<number>;
}

export interface IHE01801ImgInfo {
  imgSrc: string;
  imgAlt: string;
  hiddenAltText?: React.ReactNode;
  imgWidth?: string;
  imgHeight?: string;
}

const HE01801 = ({ headerInfo, questionInfo, audioInfo, dialogInfo, imgInfo }: IHE01801) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleButtonClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} useExtend vAlign='flex-start'>
      <Box hAlign='right'>
        <Button
          tabIndex={101}
          minWidth='96px'
          size={EStyleSizes.SMALL}
          color={EStyleButtonTypes.SECONDARY}
          label='지문보기'
          onClick={handleButtonClick}
          useRound
        />
      </Box>
      <ImgBox>
        <PinchZoom>
          <Image
            type={EImageType.IMG}
            src={imgInfo.imgSrc}
            alt={imgInfo.imgAlt}
            width={imgInfo?.imgWidth || '100%'}
            height={imgInfo?.imgHeight || '100%'}
            ariaDescribedby={imgInfo.hiddenAltText ? 'img_desc' : undefined}
          />
          {imgInfo.hiddenAltText && (
            <Box type='hidden' id='img_desc'>
              {imgInfo.hiddenAltText}
            </Box>
          )}
        </PinchZoom>
      </ImgBox>

      <Dialog
        tabIndex={102}
        width={893}
        height={458}
        topHeight={50}
        useHeader
        header={() => (
          <Box height='50px' marginBottom='20px' background={'var(--color-grey-100)'} vAlign='center' useRound={true}>
            <Typography weight={'var(--font-weight-bold)'} size={EStyleFontSizes.MEDIUM}>
              {dialogInfo.textTitle}
            </Typography>
          </Box>
        )}
        isShow={isDialogOpen}
        onClose={handleDialogClose}
        useFooter={true}
        closeLabel={'지문 닫기'}
      >
        {dialogInfo.textContent.split('\n').map((paragraph, index, arr) => (
          <React.Fragment key={index}>
            <Typography
              weight={!dialogInfo.subtitleIndexes?.has(index) ? 'var(--font-weight-medium)' : 'var(--font-weight-bold)'}
              size={EStyleFontSizes.MEDIUM}
              style={{ whiteSpace: 'pre-wrap' }}
            >
              {paragraph}
            </Typography>
            <br />
            {index !== arr.length - 1 && <br />}
          </React.Fragment>
        ))}
      </Dialog>
    </Container>
  );
};

const ImgBox = styled.div`
  display: flex;
  justify-content: center;
`;

export default HE01801;
