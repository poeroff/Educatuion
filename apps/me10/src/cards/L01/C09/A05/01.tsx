import styled from 'styled-components';
import {
  Box,
  Typography,
  TMainHeaderInfoTypes,
  IQuestionProps,
  SvgIcon,
  EStyleFontSizes,
  SimpleAudioPlayer,
  ISimpleAudioPlayerRef,
  Image,
  EImageType,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import tipBox from '@/assets/icon/gift-box.svg';
import { useRef } from 'react';

interface IdataList {
  backgroundImg: string;
  puzzle: IPuzzleData[];
  audioSrc: string[];
}

interface IPuzzleData {
  width: string;
  word: string[];
}

const P01 = () => {
  const audioRefs = useRef<(ISimpleAudioPlayerRef | null)[]>([]);
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'A',
    headerPattern: 'icon',
    iconType: 'languageUse',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '주황색 퍼즐에 유의하여 문장을 읽어 봅시다.',
  };

  const data: IdataList[] = [
    {
      backgroundImg: '/L01/C09/A05/ME1-L01-C09-A05-P01-01.jpg',
      puzzle: [
        {
          width: '180px',
          word: ['I'],
        },
        {
          width: '262px',
          word: ['have'],
        },
        {
          width: '360px',
          word: ['some candy.'],
        },
      ],
      audioSrc: ['/L01/C09/A05/ME1-L01-C09-A05-P01-01.mp3'],
    },
    {
      backgroundImg: '/L01/C09/A05/ME1-L01-C09-A05-P01-02.jpg',
      puzzle: [
        {
          width: '215px',
          word: ['You'],
        },
        {
          width: '275px',
          word: ['do not have'],
        },
        {
          width: '310px',
          word: ['a ball.'],
        },
      ],
      audioSrc: ['/L01/C09/A05/ME1-L01-C09-A05-P01-02.mp3'],
    },
    {
      backgroundImg: '/L01/C09/A05/ME1-L01-C09-A05-P01-03.jpg',
      puzzle: [
        {
          width: '180px',
          word: ['Do'],
        },
        {
          width: '200px',
          word: ['you'],
        },
        {
          width: '160px',
          word: ['like'],
        },
        {
          width: '260px',
          word: ['music?'],
        },
      ],
      audioSrc: ['/L01/C09/A05/ME1-L01-C09-A05-P01-03.mp3'],
    },
  ];

  const handleAudioReset = (index: number) => {
    audioRefs.current.forEach((ref, idx) => {
      idx !== index && ref?.changePlayStatus(false);
    });
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='flex-start'>
      <Box width='fit-content' padding='10px' border='2px solid var(--color-yellow-600)' borderRadius='32px'>
        <Typography>현재 동작 &middot; 상태 표현하기</Typography>
      </Box>
      <Box vAlign='flex-start' flexDirection='column'>
        {data.map((item, index) => (
          <Box vAlign='center' marginTop='12px'>
            <BackgroundImageBox src={item.backgroundImg} type={EImageType.IMG_BG} role='img' alt={'퍼즐 모양 배경'}>
              {item.puzzle.map(puzzleItem => (
                <Box width={puzzleItem.width} hAlign='center' flexWrap='wrap' gap='8px'>
                  {puzzleItem.word.map(wordItem => (
                    <Box width='100%' height='60px' hAlign='center'>
                      <Typography>{wordItem}</Typography>
                    </Box>
                  ))}
                </Box>
              ))}
            </BackgroundImageBox>
            <Box padding='10px 0' vAlign='flex-start' flexDirection='column' gap='24px' marginLeft='10px'>
              {item.audioSrc.map(audioSrc => (
                <SimpleAudioPlayer
                  ref={ref => {
                    audioRefs.current[index] = ref;
                  }}
                  audioSrc={audioSrc ?? ''}
                  ariaLabel={`${index + 1}번 듣기 버튼`}
                  onChangeStatus={() => handleAudioReset(index)}
                />
              ))}
            </Box>
          </Box>
        ))}
      </Box>
      <Box hAlign='flex-end' marginTop='4px'>
        <Box width='fit-content' padding='4px 10px' border='1px dashed var(--color-grey-500)' borderRadius='16px'>
          <SvgIcon src={tipBox} size='20px' />
          <Typography size={EStyleFontSizes['X-MEDIUM']} weight={'var(--font-weight-bold)'} color='var(--color-blue-800)'>
            Tip
          </Typography>
          <Typography size={EStyleFontSizes['X-MEDIUM']}>do not = don't</Typography>
        </Box>
      </Box>
    </Container>
  );
};

const BackgroundImageBox = styled(Image)`
  min-width: 790px;
  min-height: 80px;
  max-height: 80px;
  display: flex;
  background-size: cover;
`;

export default P01;
