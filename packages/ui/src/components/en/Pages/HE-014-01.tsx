import {
  Box,
  Button,
  Carousel,
  EStyleButtonTypes,
  EStyleFontSizes,
  EStyleSizes,
  IQuestionProps,
  SimpleAudioPlayer,
  SvgIcon,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useRef, useState } from 'react';

import CheckSuccess from '@maidt-cntn/assets/icons/check_succes.svg';
import Slider from 'react-slick';

export interface IVoca {
  id: number;
  word: string;
  meaning: string;
  // TO-DO : 추후 제거하여 isMemorized로 대체
  memorized: boolean;
  isMemorized?: boolean;
  path: string;
}

interface IHE01401 {
  initWordList: Omit<IVoca, 'memorized'>[];
  headerInfo?: TMainHeaderInfoTypes;
  questionInfo?: IQuestionProps | null;
  handleChange?: (index: number, status: boolean) => void;
}

const HE01401 = ({
  initWordList,
  headerInfo = {
    headerText: 'Word List',
    headerPattern: 'text',
  },
  questionInfo = {
    text: 'Check out the vocabulary from the reading text in advance.',
  },
  handleChange,
}: IHE01401) => {
  const [wordList, setWordList] = useState<IVoca[]>(initWordList.map(word => ({ ...word, memorized: word.isMemorized || false })));
  const sliderRef = useRef<{ slider: Slider | null; prevArrow: HTMLButtonElement | null; nextArrow: HTMLButtonElement | null }>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const carouselIndex = 101;

  const onChangeSlide = (index: number) => {
    timerRef.current && clearTimeout(timerRef.current);
    sliderRef.current?.prevArrow?.focus();
    handleTabBlock(index);
  };

  const isMemorized = (id: number, status: boolean) => {
    handleChange && handleChange(id, status);
    setWordList(wordList.map(word => (word.id === id ? { ...word, memorized: status } : word)));
    /* 기획 검수에 의한 주석
    if (status) {
      if (sliderRef && timerRef) {
        timerRef.current = setTimeout(() => {
          sliderRef.current?.slider?.slickNext();
        }, 2500);
      }
    }
    */
  };

  const handleTabBlock = (currentSlide: number) => {
    const slides = sliderRef.current?.slider?.innerSlider?.list?.querySelectorAll('.slick-slide') as NodeListOf<HTMLElement>;

    slides.forEach((slide, index) => {
      const focusableElements = slide.querySelectorAll<HTMLElement>('button');
      focusableElements.forEach(element => {
        element.tabIndex = currentSlide + 1 === index ? carouselIndex : -1;
      });
    });
  };

  useEffect(() => {
    handleTabBlock(0);
  }, []);

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='center'>
      <Box hAlign='center' useFull>
        <Box padding='48px 16px' width='680px' borderRadius='24px' background='white' hAlign='center' useShadow>
          <Carousel
            data={wordList}
            slideWidth={536}
            slideHeight={200}
            dots={false}
            infinite={true}
            arrowGap={-50}
            arrowSize={40}
            ref={sliderRef}
            onChange={onChangeSlide}
            tabIndex={carouselIndex}
          >
            {wordList.map(({ id, meaning, memorized, word, path }, index) => {
              return (
                <Box key={`voca-${index}`}>
                  <Box flexDirection='column' vAlign='center'>
                    <SimpleAudioPlayer audioSrc={path} id={`${id}`} />
                    <Box width='100%' marginBottom={4} overflowWrap='break-word'>
                      <Typography width='100%' align='center' fontSize='var(--font-size-36)' lineHeight='50px' weight='var(--font-weight-bold)'>
                        {word}
                      </Typography>
                    </Box>
                    <Typography>{meaning}</Typography>
                  </Box>

                  <Box marginTop={24} hAlign='center'>
                    <Button
                      size={EStyleSizes.SMALL}
                      color={memorized ? EStyleButtonTypes.SUCCESS : EStyleButtonTypes.SECONDARY}
                      style={{ padding: '10px 12px' }}
                      useRound
                      onClick={() => isMemorized(id, !memorized)}
                    >
                      {memorized && (
                        <Box vAlign='center' marginRight='4px'>
                          <SvgIcon size='20px' src={memorized ? CheckSuccess : ''} alt='' />
                        </Box>
                      )}
                      다 외웠어요!
                    </Button>
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
export default HE01401;
