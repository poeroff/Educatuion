import { useRef, useState, useMemo } from 'react';
import { Box, TMainHeaderInfoTypes, Typography, Carousel, SvgIcon, SimpleAudioPlayer, Button, EStyleButtonTypes, EStyleSizes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import CheckSuccess from '@maidt-cntn/assets/icons/check_succes.svg';
import Slider from 'react-slick';
import { useRecoilState } from 'recoil';
import { L04SP01_1 } from './store';

interface IVoca {
  id: number;
  word: string;
  meaning: string;
  memorized: boolean;
  path: string;
}

const P01 = ({ _page = 'P01' }: { _page?: string }) => {
  const [cardData, setCardData] = useRecoilState(L04SP01_1);

  const initWordList = useMemo(() => {
    const wordList = [
      { id: 1, word: 'translate', meaning: '번역하다', file: 'translate' },
      { id: 2, word: 'automatically', meaning: '자동으로', file: 'automatically' },
      { id: 3, word: 'high-tech', meaning: '첨단 기술의', file: 'high-tech' },
      { id: 4, word: 'target', meaning: '목표로 삼다', file: 'target' },
      { id: 5, word: 'nutrient', meaning: '영양소', file: 'nutrient' },
      { id: 6, word: 'be concerned about', meaning: '~을 걱정하다', file: 'be_concerned_about' },
      { id: 7, word: 'laboratory', meaning: '실험실', file: 'laboratory' },
      { id: 8, word: 'take the place of', meaning: '~을 대신하다', file: 'take_the_place_of' },
      { id: 9, word: 'convenient', meaning: '편리한', file: 'convenient' },
      { id: 10, word: 'arrange', meaning: '배열하다', file: 'arrange' },
    ];
    return wordList.map(word => ({ ...word, path: `/L04/SP01-1/HE2-L04-SP01-1-voca_${word.file}.mp3` }));
  }, []);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 단어 암기',
    headerPattern: 'text',
  };

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
      P01: {
        ...prev.P01,
        isChecked: prev.P01.isChecked.map((check, index) => (index === id - 1 ? status : check)),
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
      <Box hAlign='center' useFull>
        <Box padding='48px 16px' width='680px' borderRadius='24px' background='white' hAlign='center' useShadow>
          <Carousel data={wordList} slideWidth={536} dots={false} arrowGap={-50} arrowSize={40} ref={sliderRef} onChange={onChangeSlide}>
            {wordList.map(({ id, meaning, memorized, word, path }, index) => {
              const audioTabIndex = carouselIndex + index * 2;
              const memorizedTabIndex = carouselIndex + index * 2 + 1;
              return (
                <Box key={`voca-${id}`} vAlign='center' hAlign='center'>
                  <Box flexDirection='column' vAlign='center'>
                    <SimpleAudioPlayer audioSrc={path} tabIndex={audioTabIndex} id={`${id}`} />
                    <Box width='100%' margin={4} overflowWrap='break-word'>
                      <Typography width='100%' align='center' fontSize='var(--font-size-36)' lineHeight='50px' weight='var(--font-weight-bold)'>
                        {word}
                      </Typography>
                    </Box>
                    <Box padding='12px' hAlign='center'>
                      <Typography>{meaning}</Typography>
                    </Box>
                    <Box padding='12px' hAlign='center'>
                      {!memorized && !cardData.P01.isChecked[id - 1] ? (
                        <Button
                          color={EStyleButtonTypes.SECONDARY}
                          size={EStyleSizes.SMALL}
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
