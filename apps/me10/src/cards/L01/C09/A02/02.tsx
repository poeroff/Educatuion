import styled from '@emotion/styled';
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
import tipBox from '../../../../assets/icon/gift-box.svg';
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

const P02 = () => {
  const audioRefs = useRef<(ISimpleAudioPlayerRef | null)[]>([]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    headerText: 'A',
    iconType: 'languageUse',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '주황색 퍼즐에 유의하여 문장을 읽어 봅시다.',
  };

  const data: IdataList[] = [
    {
      backgroundImg: '/L01/C09/A02/ME1-L01-C09-A02-P01.jpg',
      puzzle: [
        {
          width: '252px',
          word: ['He'],
        },
        {
          width: '262px',
          word: ['is', 'is not'],
        },
        {
          width: '276px',
          word: ['a teacher.'],
        },
      ],
      audioSrc: ['/L01/C09/A02/ME1-L01-C09-A02-P02-01.mp3', '/L01/C09/A02/ME1-L01-C09-A02-P02-02.mp3'],
    },
    {
      backgroundImg: '/L01/C09/A02/ME1-L01-C09-A02-P02.jpg',
      puzzle: [
        {
          width: '252px',
          word: ['Are', 'Is'],
        },
        {
          width: '262px',
          word: ['you', 'she'],
        },
        {
          width: '276px',
          word: ['a student?'],
        },
      ],
      audioSrc: ['/L01/C09/A02/ME1-L01-C09-A02-P02-03.mp3', '/L01/C09/A02/ME1-L01-C09-A02-P02-04.mp3'],
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
        <Typography>am/are/is ~이다, ~이 있다.</Typography>
      </Box>
      <Box vAlign='flex-start' flexDirection='column'>
        {data.map(item => (
          <Box vAlign='center' marginTop='12px'>
            <Background type={EImageType.IMG_BG} role='img' alt={'퍼즐 모양 배경’'}>
              <Image src={item.backgroundImg} width='790px' height='130px' />
            </Background>
            {item.puzzle.map(puzzleItem => (
              <Box width={puzzleItem.width} hAlign='center' flexWrap='wrap' gap='8px'>
                {puzzleItem.word.map(wordItem => (
                  <Box width='100%' height='60px' hAlign='center'>
                    <Typography>{wordItem}</Typography>
                  </Box>
                ))}
              </Box>
            ))}
            <Box padding='10px 0' vAlign='flex-start' flexDirection='column' gap='24px' marginLeft='10px'>
              {item.audioSrc.map((audioSrc, index) => (
                <SimpleAudioPlayer
                  ref={ref => {
                    audioRefs.current[index] = ref;
                  }}
                  audioSrc={audioSrc ?? ''}
                  ariaLabel={index + '번 듣기 버튼'}
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
          <Typography size={EStyleFontSizes['X-MEDIUM']}>is not = isn’t</Typography>
        </Box>
      </Box>
    </Container>
  );
};

const Background = styled(Image)`
  position: absolute;
`;

export default P02;
