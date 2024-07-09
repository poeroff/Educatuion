import { useEffect, useRef, useState } from 'react';
import {
  Box,
  TMainHeaderInfoTypes,
  Typography,
  Carousel,
  SvgIcon,
  SimpleAudioPlayer,
  Button,
  EStyleButtonTypes,
  EStyleSizes,
  IQuestionProps,
  EStyleFontSizes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import CheckSuccess from '@maidt-cntn/assets/icons/check_succes.svg';
import Slider from 'react-slick';

interface IVoca {
  id: number;
  word: string;
  meaning: string;
  memorized: boolean;
}
const P01 = () => {
  const [wordList, setWordList] = useState<IVoca[]>(mockData);
  const sliderRef = useRef<{ slider: Slider | null; prevArrow: HTMLButtonElement | null; nextArrow: HTMLButtonElement | null }>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const carouselIndex = 101;

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Word List',
    headerPattern: 'text',
  };
  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'Check out the vocabulary from the main text in advance.',
  };

  const getAudioSrc = (id: number) => {
    return `/L01/C05/A04/HE1-L01-C05-A04-${id.toString().padStart(2, '0')}.mp3`;
  };

  const onChangeSlide = (index: number) => {
    timerRef.current && clearTimeout(timerRef.current);
    sliderRef.current?.prevArrow?.focus();
    handleTabBlock(index);
  };

  const isMemorized = (id: number, isMemorized: boolean) => {
    setWordList(wordList.map(word => (word.id === id ? { ...word, memorized: isMemorized } : word)));
    /* 기획 검수에 의한 주석
    if (sliderRef && timerRef && isMemorized) {
      timerRef.current = setTimeout(() => {
        sliderRef.current?.slider?.slickNext();
      }, 2500);
    }*/
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
        <Box padding='24px 16px' width='680px' height='320px' borderRadius='20px' background='white' hAlign='center' useShadow>
          <Carousel
            data={wordList}
            slideWidth={536}
            slideHeight={200}
            dots={false}
            infinite
            arrowGap={-50}
            arrowSize={40}
            ref={sliderRef}
            onChange={onChangeSlide}
            tabIndex={carouselIndex}
          >
            {wordList.map((item, index = 0) => (
              <Box key={`voca-${index}`} height='233px'>
                <Box hAlign='center'>
                  <SimpleAudioPlayer audioSrc={getAudioSrc(index + 1)} />
                  <Typography weight={700} style={{ padding: '8px 12px' }}>
                    {item.word}
                  </Typography>
                </Box>
                <Box padding='12px' hAlign='center'>
                  <Typography style={{ padding: '12px' }}>{item.meaning}</Typography>
                </Box>
                <Box paddingTop='10px' hAlign='center'>
                  {!item.memorized ? (
                    <Button
                      color={EStyleButtonTypes.SECONDARY}
                      minWidth='130px'
                      size={EStyleSizes.SMALL}
                      useRound
                      onClick={() => isMemorized(item.id, true)}
                      ariaLabel={`${index + 1} 번째 카드 암기 확인 버튼`}
                      style={{ padding: '10px 16px' }}
                    >
                      다 외웠나요?
                    </Button>
                  ) : (
                    <Button
                      color={EStyleButtonTypes.SUCCESS}
                      minWidth='140px'
                      size={EStyleSizes.SMALL}
                      useRound
                      onClick={() => isMemorized(item.id, false)}
                      ariaLabel={`${index + 1} 번째 카드 암기 확인 버튼`}
                      style={{ padding: '10px 16px' }}
                    >
                      <SvgIcon style={{ marginRight: '4px' }} width='20px' height='20px' src={CheckSuccess} />다 외웠어요!
                    </Button>
                  )}
                </Box>
              </Box>
            ))}
          </Carousel>
        </Box>
      </Box>
    </Container>
  );
};

const mockData: IVoca[] = [
  { id: 1, word: 'evolutionary', meaning: '진화의, 점진적인', memorized: false },
  { id: 2, word: 'biologist', meaning: '생물학자', memorized: false },
  { id: 3, word: 'locate', meaning: '위치하다, 설치하다', memorized: false },
  { id: 4, word: 'fascinating', meaning: '흥미로운, 매력적인', memorized: false },
  { id: 5, word: 'companion', meaning: '동반자, 동행', memorized: false },
  { id: 6, word: 'responsive', meaning: '즉각 반응하는', memorized: false },
  { id: 7, word: 'behavior', meaning: '행동', memorized: false },
  { id: 8, word: 'anthropologist', meaning: '인류학자', memorized: false },
  { id: 9, word: 'conduct', meaning: '지휘하다', memorized: false },
  { id: 10, word: 'ancestor', meaning: '조상, 선조', memorized: false },
  { id: 11, word: 'at random', meaning: '무작위로', memorized: false },
  { id: 12, word: 'conclude', meaning: '결론을 내리다', memorized: false },
  { id: 13, word: 'species', meaning: '종', memorized: false },
  { id: 14, word: 'evolve', meaning: '발달하다, 진화하다', memorized: false },
  { id: 15, word: 'colleague', meaning: '동료', memorized: false },
  { id: 16, word: 'genetically', meaning: '유전 공학적인', memorized: false },
  { id: 17, word: 'cooperate', meaning: '협력하다, 협조하다', memorized: false },
  { id: 18, word: 'cooperative', meaning: '협조적인', memorized: false },
  { id: 19, word: 'device', meaning: '장치', memorized: false },
  { id: 20, word: 'occasionally', meaning: '가끔', memorized: false },
  { id: 21, word: 'get along', meaning: '어울리다', memorized: false },
  { id: 22, word: 'extinction', meaning: '멸종', memorized: false },
  { id: 23, word: 'superior', meaning: '우수한', memorized: false },
  { id: 24, word: 'attribute', meaning: '공헌하다', memorized: false },
  { id: 25, word: 'ultimately', meaning: '궁극적으로', memorized: false },
  { id: 26, word: 'thrive', meaning: '번창하다', memorized: false },
  { id: 27, word: 'competitive', meaning: '경쟁적인', memorized: false },
  { id: 28, word: 'alternative', meaning: '대안, 선택 가능한 것', memorized: false },
  { id: 29, word: 'bouquet', meaning: '부케, 꽃다발', memorized: false },
  { id: 30, word: 'harmonize', meaning: '조화를 이루다, 어울리다', memorized: false },
  { id: 31, word: 'flourish', meaning: '번창하다', memorized: false },
];

export default P01;
