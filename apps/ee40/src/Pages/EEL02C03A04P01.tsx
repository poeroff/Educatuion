import { Box, IQuestionProps, Image, BoxWrap, SimpleAudioPlayer, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import React from 'react';

export interface IImageProps {
  src: string;
  alt: string;
  title: string;
  width?: string;
  height?: string;
}

export type HighlightProps = {
  text: string;
  highlightChar: string;
  color: string;
};

export interface IEEL02C03A04P01 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  imageInfo: IImageProps;
  data: HighlightProps[];
  audioList: Array<{ audioSrc: string }>;
}

const HighlightText: React.FC<HighlightProps> = ({ text, highlightChar, color }) => {
  const getHighlightedText = (text: string, highlightChar: string, color: string) => {
    const words = text.split(' ');

    return words.map((word, index) => {
      // 각 단어에서 highlightChar와 일치하는 부분을 span으로 감싸 하이라이트 처리
      const parts = word.split(highlightChar);
      return (
        <span key={index}>
          {parts.map((part, partIndex) =>
            partIndex === parts.length - 1 ? (
              part
            ) : (
              <React.Fragment key={partIndex}>
                {part}
                <span style={{ color }}>{highlightChar}</span>
              </React.Fragment>
            ),
          )}
          {index < words.length - 1 && ' '}
        </span>
      );
    });
  };

  return <span>{getHighlightedText(text, highlightChar, color)}</span>;
};

const EEL02C03A04P01 = ({ headerInfo, questionInfo, imageInfo, data, audioList }: IEEL02C03A04P01) => {
  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo}>
      <BoxWrap useFull display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
        <Box useFull hAlign={'center'} vAlign={'center'}>
          <Image src={imageInfo.src} alt={imageInfo.alt} title={imageInfo.title} height={imageInfo.height}></Image>
        </Box>
        <Box useFull hAlign={'center'} vAlign={'center'} marginTop={20} gap={10}>
          {data.map((value, index = 0) => (
            <Box key={index} display={'flex'} flexDirection={'row'} justifyContent={'center'} padding={'0 12px'}>
            {/* <Box key={index} display={'flex'} flexDirection={'row'} justifyContent={'center'} marginRight={10}> */}
              <Box
                fontSize={'32px'}
                fontWeight={500}
                // marginLeft={'15px'}
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
                justifyContent={'center'}
                height={118}
                gap={'10px'}
              >
                <Box height={64} alignContent='center'>
                  <HighlightText text={value.text} highlightChar={value.highlightChar} color={value.color} />
                </Box>
                <SimpleAudioPlayer audioSrc={audioList[index]?.audioSrc} />
              </Box>
            </Box>
          ))}
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default EEL02C03A04P01;
