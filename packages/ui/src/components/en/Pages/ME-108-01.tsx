import { ReactNode, useRef } from 'react';
import {
  Box,
  EImageType,
  EStyleFontSizes,
  Image,
  IQuestionProps,
  ISimpleAudioPlayerRef,
  SimpleAudioPlayer,
  SvgIcon,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import styled from '@emotion/styled';
import tipBox from '@/assets/icon/gift-box.svg';

export interface IdataList {
  backgroundImg: string;
  puzzle: IPuzzleData[];
  audioSrc: string[];
  alt?: string;
}

interface IPuzzleData {
  width: string;
  word: string[];
}

interface IME10801 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  title?: ReactNode;
  data: IdataList[];
  isFull: boolean;
  tip?: ReactNode;
}

const ME10801 = ({ headerInfo, questionInfo, title, data, isFull, tip }: IME10801) => {
  const audioRefs = useRef<(ISimpleAudioPlayerRef | null)[]>([]);

  const handleAudioReset = (index: number) => {
    audioRefs.current.forEach((ref, idx) => {
      idx !== index && ref?.changePlayStatus(false);
    });
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='flex-start'>
      <Box width='fit-content' padding='10px' border='2px solid var(--color-yellow-600)' borderRadius='32px'>
        {title}
      </Box>
      <Box vAlign='flex-start' flexDirection='column'>
        {data.map((item, itemIndex) => (
          <Box vAlign='center' width={isFull ? '100%' : undefined} flexDirection={isFull ? 'column' : undefined} marginTop='12px' key={itemIndex}>
            <BackgroundImageBox src={item.backgroundImg} type={EImageType.IMG_BG} role='img' alt={item.alt} isFull={isFull}>
              {item.puzzle.map((puzzleItem, puzzleIndex) => (
                <Box width={puzzleItem.width} hAlign='center' flexWrap='wrap' gap='8px' key={puzzleIndex}>
                  {puzzleItem.word.map((wordItem, wordIndex) => (
                    <Box width='100%' height='60px' hAlign='center' key={wordIndex}>
                      <Typography>{wordItem}</Typography>
                    </Box>
                  ))}
                </Box>
              ))}
            </BackgroundImageBox>
            <Box padding='10px 0' useFull={isFull} vAlign={isFull ? 'flex-end' : undefined} flexDirection='column' gap='24px' marginLeft='10px'>
              {item.audioSrc.map((audioSrc, index) => (
                <SimpleAudioPlayer
                  ref={ref => {
                    audioRefs.current[itemIndex * item.audioSrc.length + index] = ref;
                  }}
                  audioSrc={audioSrc}
                  ariaLabel={itemIndex * item.audioSrc.length + index + 1 + '번 듣기 버튼'}
                  onChangeStatus={() => handleAudioReset(itemIndex * item.audioSrc.length + index)}
                  key={index}
                />
              ))}
            </Box>
          </Box>
        ))}
      </Box>
      {tip && (
        <Box hAlign='flex-end' marginTop='4px'>
          <Box width='fit-content' padding='4px 10px' border='1px dashed var(--color-grey-500)' borderRadius='16px'>
            <SvgIcon src={tipBox} size='20px' />
            <Typography size={EStyleFontSizes['X-MEDIUM']} weight={'var(--font-weight-bold)'} color='var(--color-blue-800)'>
              Tip
            </Typography>
            {tip}
          </Box>
        </Box>
      )}
    </Container>
  );
};

const BackgroundImageBox = styled(Image)<{ isFull: boolean }>`
  width: ${props => (props.isFull ? '100%' : 'auto')};
  min-height: 80px;
  display: flex;
  background-size: '100%';
`;

export default ME10801;
