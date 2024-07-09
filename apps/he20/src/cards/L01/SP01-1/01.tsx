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
import { L01SP01_1 } from './store';
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
  const [cardData, setCardData] = useRecoilState(L01SP01_1);

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
      { id: 1, word: 'volunteer', meaning: '자원봉사 하다', file: 'volunteer' },
      { id: 2, word: 'come along', meaning: '함께 가다', file: 'come_along' },
      { id: 3, word: 'charity', meaning: '자선', file: 'charity' },
      { id: 4, word: 'construction', meaning: '건설', file: 'construction' },
      { id: 5, word: 'mobile', meaning: '이동하는', file: 'mobile' },
      { id: 6, word: 'countless', meaning: '셀 수 없이 많은', file: 'countless' },
      { id: 7, word: 'well-being', meaning: '건강', file: 'well-being' },
      { id: 8, word: 'adopt', meaning: '입양하다', file: 'adopt' },
      { id: 9, word: 'sensitive', meaning: '예민한', file: 'sensitive' },
      { id: 10, word: 'translator', meaning: '번역기', file: 'translator' },
    ];
    return wordList.map(word => ({ ...word, path: `/L01/SP01-1/HE2-L01-SP01-1-voca_${word.file}.mp3` }));
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
