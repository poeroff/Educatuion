import React from 'react';
import styled from 'styled-components';
import { Container } from '@maidt-cntn/ui/en';
import { TMainHeaderInfoTypes, SimpleAudioPlayer, Box, Image, IQuestionProps, BoxWrap, IAudioPlayerProps, Typography } from '@maidt-cntn/ui';

type Image = {
  src: string;
  alt: string;
  value?: string;
  title?: string;
};

type Audio = {
  audioSrc: string;
};

export type HighlightProps = {
  en: string;
  highlightChar: string;
};

interface IEESL1C02A02P01 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  imageList: Image[];
  audioList: Audio[];
  mainAudio: IAudioPlayerProps;
  boxWidth: string;
  boxHeight: string;
  boxGap: number;
  gridCol: number;
  data: HighlightProps[];
}

const EESL1C02A02P01 = ({
  headerInfo,
  questionInfo,
  imageList,
  audioList,
  mainAudio,
  boxWidth,
  boxHeight,
  boxGap,
  gridCol,
  data,
}: IEESL1C02A02P01) => {
  return (
    <Container vAlign='top' headerInfo={headerInfo} questionInfo={questionInfo} submitLabel={'완료하기'}>
      <Box useFull justifyContent={'center'} alignItems='center' flexDirection='column'>
        <Box fontSize={'32px'} fontWeight={500} marginBottom={'20px'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
          {data.map((item, index) => {
            const parts = item.en.split(new RegExp(`(${item.highlightChar})`, 'gi'));
            return (
              <Typography fontSize='32px'>
                {parts.map((part: any, i: number) => (
                  <span key={i} style={{ color: part.toLowerCase() === item.highlightChar.toLowerCase() ? 'red' : 'inherit' }}>
                    {part}
                  </span>
                ))}
              </Typography>
            );
          })}
          <SimpleAudioPlayer audioSrc={mainAudio.audioSrc} />
        </Box>
        <ImageWrap gridCol={gridCol}>
          {imageList.map((image, index) => {
            return (
              <StyledBox key={index} width={boxWidth} height={boxHeight} gap={boxGap}>
                <Box>
                  <Box hAlign='center' vAlign='center' width='220px' height='192px' borderRadius='8px'>
                    <Image src={image.src} alt={image.alt} width='220px' height='fit-content' />
                  </Box>
                  <Box display='flex' hAlign='center' vAlign='center'>
                    <SimpleAudioPlayer audioSrc={audioList[index as number].audioSrc} />
                    <Box fontSize={'32px'} hAlign='center' vAlign='center' width={'100%'} height={'56px'} padding={'8px 12px 8px 12px'}>
                      {image.value}
                    </Box>
                  </Box>
                </Box>
              </StyledBox>
            );
          })}
        </ImageWrap>
      </Box>
    </Container>
  );
};

const StyledBox = styled(Box)<{ width: string; height: string; gap: number }>`
  width: ${({ width }) => width};
  min-height: ${({ height }) => height};
  gap: ${({ gap }) => gap};
`;
const ImageWrap = styled.div<{ gridCol: number }>`
  grid-gap: 10px;
  display: grid;
  grid-template-columns: repeat(${({ gridCol }) => gridCol}, 1fr);
  justify-items: center;
`;
export default EESL1C02A02P01;
