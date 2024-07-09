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
import { Container } from '@maidt-cntn/ui/en';
import { useRef, useState, useEffect, useMemo } from 'react';
import CheckSuccess from '@maidt-cntn/assets/icons/check_succes.svg';
import Slider from 'react-slick';
import { useRecoilState } from 'recoil';
import { L02SP01_1 } from './store';

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

  const initWordList = useMemo(() => {
    const wordList = [
      { id: 1, word: 'discount', meaning: '할인', file: 'discount' },
      { id: 2, word: 'allowance', meaning: '용돈', file: 'allowance' },
      { id: 3, word: 'carelessly', meaning: '경솔하게', file: 'carelessly' },
      { id: 4, word: 'reasonable', meaning: '합리적인', file: 'reasonable' },
      { id: 5, word: 'reputation', meaning: '명성', file: 'reputation' },
      { id: 6, word: 'sign up for', meaning: '~을 신청하다', file: 'sign_up_for' },
      { id: 7, word: 'chemical', meaning: '화학의', file: 'chemical' },
      { id: 8, word: 'ingredient', meaning: '성분', file: 'ingredient' },
      { id: 9, word: 'entire', meaning: '전체의', file: 'entire' },
      { id: 10, word: 'private', meaning: '개인의', file: 'private' },
    ];
    return wordList.map(word => ({ ...word, path: `/L02/SP01-1/HE2-L02-SP01-1-voca_${word.file}.mp3` }));
  }, []);

  const [wordList, setWordList] = useState<IVoca[]>(initWordList.map(word => ({ ...word, memorized: false })));
  const sliderRef = useRef<{ slider: Slider | null; prevArrow: HTMLButtonElement | null; nextArrow: HTMLButtonElement | null }>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const carouselIndex = 101;

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

    if (status) {
      if (sliderRef && timerRef) {
        timerRef.current = setTimeout(() => {
          sliderRef.current?.slider?.slickNext();
        }, 2500);
      }
    }
  };

  return (
    <Container headerInfo={headerInfo} vAlign='center'>
      <Box vAlign='center' hAlign='center' useFull>
        <Box height='300px' background='white' vAlign='center' hAlign='center' useShadow useRound>
          <Carousel
            data={wordList}
            slideHeight={200}
            dots={false}
            infinite={true}
            arrowGap={20}
            arrowSize={40}
            ref={sliderRef}
            onChange={onChangeSlide}
            tabIndex={carouselIndex}
          >
            {wordList.map(({ id, meaning, memorized, word, path }, index) => {
              const audioTabIndex = carouselIndex + index * 2;
              const memorizedTabIndex = carouselIndex + index * 2 + 1;
              return (
                <Box key={`voca-${id}`} vAlign='center' hAlign='center'>
                  <Box height='250px'>
                    <Box padding='12px' hAlign='center'>
                      <SimpleAudioPlayer audioSrc={path} tabIndex={audioTabIndex} id={`${id}`} />
                      <Typography weight={700}>{word}</Typography>
                    </Box>
                    <Box padding='12px' hAlign='center'>
                      <Typography>{meaning}</Typography>
                    </Box>
                    <Box padding='12px' hAlign='center'>
                      {!memorized && !cardData.p01.isChecked[id - 1] ? (
                        <Button
                          color={EStyleButtonTypes.SECONDARY}
                          size={EStyleSizes.SMALL}
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
