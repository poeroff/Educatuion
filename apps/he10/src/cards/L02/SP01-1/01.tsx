import {
  Box,
  Button,
  Carousel,
  EStyleButtonTypes,
  EStyleSizes,
  IQuestionProps,
  SimpleAudioPlayer,
  SvgIcon,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { useMemo, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { L02SP01_1 } from './store';
import { Container } from '@maidt-cntn/ui/en';

import CheckSuccess from '@maidt-cntn/assets/icons/check_succes.svg';
import Slider from 'react-slick';

export interface IVoca {
  id: number;
  word: string;
  meaning: string;
  memorized: boolean;
  path: string;
}

const P01 = () => {
  const [cardData, setCardData] = useRecoilState(L02SP01_1);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 단어 암기',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    size: 'large',
    text: '',
  };

  const contentTabIndexMinimum = 101;

  const initWordList = useMemo(() => {
    const wordList = [
      { id: 1, word: 'shame', meaning: '아쉬운 일', file: 'shame' },
      { id: 2, word: 'look forward to', meaning: '~을 고대하다', file: 'look_forward_to' },
      { id: 3, word: 'emotion', meaning: '감정', file: 'emotion' },
      { id: 4, word: 'figure out', meaning: '이해하다', file: 'figure_out' },
      { id: 5, word: 'appreciate', meaning: '감상하다', file: 'appreciate' },
      { id: 6, word: 'wave', meaning: '흔들다', file: 'wave' },
      { id: 7, word: 'manner', meaning: '예의', file: 'manner' },
      { id: 8, word: 'acknowledge', meaning: '인정하다', file: 'acknowledge' },
      { id: 9, word: 'heat-warming', meaning: '마음이 따뜻해지는', file: 'heat_warming' },
      { id: 10, word: 'reasoning', meaning: '추리', file: 'reasoning' },
    ];
    return wordList.map(word => ({ ...word, path: `/L02/SP01-1/HE1-L02-SP01-1-voca_${word.file}.mp3` }));
  }, []);

  const [wordList, setWordList] = useState<IVoca[]>(initWordList.map(word => ({ ...word, memorized: false })));
  const sliderRef = useRef<Slider>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const onChangeSlide = (index: number) => {
    timerRef.current && clearTimeout(timerRef.current);
  };

  const isMemorized = (id: number, status: boolean) => {
    setWordList(wordList.map(word => (word.id === id ? { ...word, memorized: status } : word)));

    setCardData(prev => ({
      ...prev,
      p01: {
        ...prev.p01,
        isChecked: prev.p01.isChecked.map((check, index) => (index === id - 1 ? status : check)),
      },
    }));
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='center'>
      <Box vAlign='center' hAlign='center' useFull>
        <Box padding='48px 16px' width='680px' borderRadius='24px' background='white' hAlign='center' useShadow>
          <Carousel
            data={wordList}
            slideWidth={536}
            dots={false}
            infinite={true}
            arrowGap={-50}
            arrowSize={40}
            ref={sliderRef}
            onChange={onChangeSlide}
          >
            {wordList.map(({ id, meaning, memorized, word, path }, index) => {
              const audioTabIndex = contentTabIndexMinimum + index * 2;
              const memorizedTabIndex = contentTabIndexMinimum + index * 2 + 1;
              return (
                <Box key={`voca-${id}`}>
                  <Box flexDirection='column' vAlign='center'>
                    <SimpleAudioPlayer audioSrc={path} tabIndex={audioTabIndex} id={`${id}`} />
                    <Box width='100%' marginBottom={4} overflowWrap='break-word'>
                      <Typography width='100%' align='center' fontSize='var(--font-size-36)' lineHeight='50px' weight='var(--font-weight-bold)'>
                        {word}
                      </Typography>
                    </Box>
                    <Typography>{meaning}</Typography>
                  </Box>

                  <Box padding='12px' hAlign='center'>
                    {!memorized && !cardData.p01.isChecked[id - 1] ? (
                      <Button
                        color={EStyleButtonTypes.SECONDARY}
                        size={EStyleSizes.SMALL}
                        style={{ padding: '10px 12px' }}
                        useRound
                        onClick={() => isMemorized(id, true)}
                        tabIndex={memorizedTabIndex}
                      >
                        다 외웠나요?
                      </Button>
                    ) : (
                      <Button
                        color={EStyleButtonTypes.SUCCESS}
                        minWidth='140px'
                        size={EStyleSizes.SMALL}
                        useRound
                        onClick={() => isMemorized(id, false)}
                        tabIndex={memorizedTabIndex}
                      >
                        <SvgIcon src={CheckSuccess} size='20px' />다 외웠어요!
                      </Button>
                    )}
                  </Box>
                </Box>
              );
            })}
          </Carousel>
        </Box>
      </Box>
    </Container>
  );
};

export default P01;
