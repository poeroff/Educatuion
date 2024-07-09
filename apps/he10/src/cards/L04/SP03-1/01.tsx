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
import L04SP031State from './store';
import { Container } from '@maidt-cntn/ui/en';

import CheckSuccess from '@maidt-cntn/assets/icons/check_succes.svg';
import Slider from 'react-slick';

interface IVoca {
  id: number;
  word: string;
  meaning: string;
  memorized: boolean;
  path: string;
}

const P01 = () => {
  const [cardData, setCardData] = useRecoilState(L04SP031State);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 단어 암기',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    size: 'large',
    text: '',
  };

  const contentTabIndexMinimum = 101;

  const initWordList = useMemo(() => {
    const wordList = [
      { id: 1, word: 'sentiment', meaning: '정서', file: 'sentiment' },
      { id: 2, word: 'spring up', meaning: '생겨나다', file: 'spring_up' },
      { id: 3, word: 'approximately', meaning: '거의', file: 'approximately' },
      { id: 4, word: 'consume', meaning: '소비하다', file: 'consume' },
      { id: 5, word: 'necessity', meaning: '필수품', file: 'necessity' },
      { id: 6, word: 'substantial', meaning: '상당한', file: 'substantial' },
      { id: 7, word: 'extraction', meaning: '추출', file: 'extraction' },
      { id: 8, word: 'dispose of', meaning: '~을 처리하다', file: 'dispose_of' },
      { id: 9, word: 'vast', meaning: '어머어마한', file: 'vast' },
      { id: 10, word: 'quantity', meaning: '양', file: 'quantity' },
      { id: 11, word: 'landfill', meaning: '매립지', file: 'landfill' },
      { id: 12, word: 'release', meaning: '방출하다', file: 'release' },
      { id: 13, word: 'potent', meaning: '강력한', file: 'potent' },
      { id: 14, word: 'incinerate', meaning: '소각하다', file: 'incinerate' },
      { id: 15, word: 'take into account', meaning: '~을 고려하다', file: 'take_into_account' },
      { id: 16, word: 'compound', meaning: '화합물', file: 'compound' },
      { id: 17, word: 'measure', meaning: '조치', file: 'measure' },
      { id: 18, word: 'collaborate', meaning: '협력하다', file: 'collaborate' },
      { id: 19, word: 'impurity', meaning: '불순물', file: 'impurity' },
      { id: 20, word: 'fertilizer', meaning: '비료', file: 'fertilizer' },
      { id: 21, word: 'transform', meaning: '변형시키다', file: 'transform' },
      { id: 22, word: 'repurpose', meaning: '다른 목적에 맞게 만들다', file: 'repurpose' },
      { id: 23, word: 'fabric', meaning: '직물', file: 'fabric' },
      { id: 24, word: 'absorb', meaning: '흡수하다', file: 'absorb' },
      { id: 25, word: 'take steps', meaning: '조치를 취하다', file: 'take_steps' },
      { id: 26, word: 'sustainable', meaning: '지속 가능한', file: 'sustainable' },
      { id: 27, word: 'dedicate ~ to', meaning: '~을 ~에 바치다', file: 'dedicate_to' },
    ];
    return wordList.map(word => ({ ...word, path: `/L04/SP03-1/HE1-L04-SP03-1-voca_${word.file}.mp3` }));
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
                        다 외웠어요!
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
