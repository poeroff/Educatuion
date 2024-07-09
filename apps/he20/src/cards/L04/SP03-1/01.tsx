import CheckSuccess from '@maidt-cntn/assets/icons/check_succes.svg';
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
import { useEffect, useMemo, useRef } from 'react';
import Slider from 'react-slick';
import { useRecoilState } from 'recoil';
import { L04SP03_1 } from './store';

const P01 = ({ _page = 'P01' }: { _page?: string }) => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 단어 암기',
    headerPattern: 'text',
  };
  const questionInfo: IQuestionProps = {
    size: 'large',
    text: '',
  };

  const initWordList = useMemo(() => {
    const wordList = [
      { id: 1, word: 'neural', meaning: '신경의' },
      { id: 2, word: 'implant', meaning: '(수술을 통해 인체에) 주입하는 [심는] 물질' },
      { id: 3, word: 'neuroscience', meaning: '신경 과학' },
      { id: 4, word: 'disorder', meaning: '( 신체 기능의 ) 장애' },
      { id: 5, word: 'spinal cord', meaning: '척수' },
      { id: 6, word: 'integrate', meaning: '통합하다' },
      { id: 7, word: 'ethical', meaning: '윤리적인' },
      { id: 8, word: 'normal', meaning: '정상적인' },
      { id: 9, word: 'paralyze', meaning: '마비시키다' },
      { id: 10, word: 'mechanism', meaning: '방법' },
      { id: 11, word: 'limb', meaning: '팔다리' },
      { id: 12, word: 'spread', meaning: '퍼지다' },
      { id: 13, word: 'available', meaning: '이용할 수 있는' },
      { id: 14, word: 'enhance', meaning: '향상시키다' },
      { id: 15, word: 'vividly', meaning: '생생하게' },
      { id: 16, word: 'revolutionize', meaning: '혁신을 일으키다' },
      { id: 17, word: 'embrace', meaning: '받아들이다' },
      { id: 18, word: 'era', meaning: '시대' },
      { id: 19, word: 'identity', meaning: '정체성' },
      { id: 20, word: 'existence', meaning: '존재' },
      { id: 21, word: 'reliance', meaning: '의존' },
      { id: 22, word: 'permission', meaning: '허가' },
      { id: 23, word: 'inequality', meaning: '불평등' },
      { id: 24, word: 'overcome', meaning: '극복하다' },
      { id: 25, word: 'aspect', meaning: '측면' },
      { id: 26, word: 'establish', meaning: '확립하다' },
      { id: 27, word: 'prior', meaning: '사전의' },
      { id: 28, word: 'assess', meaning: '평가하다' },
      { id: 29, word: 'in accordance with', meaning: '~ 에 부합되게' },
      { id: 30, word: 'enforce', meaning: '( 법 등을 ) 시행하다' },
    ];
    return wordList.map(word => ({ ...word, path: `/L04/SP03-1/HE2-L04-SP03-1-voca_${word.word.toString().replace(/\s/gi, '_')}.mp3` }));
  }, []);

  const [cardData, setCardData] = useRecoilState(L04SP03_1);

  useEffect(() => {
    if (cardData.p01.wordList.length === 0) {
      setCardData(prev => ({
        ...prev,
        p01: {
          ...prev.p01,
          wordList: initWordList.map(word => ({ ...word, memorized: false })),
        },
      }));
    }
  }, []);

  const sliderRef = useRef<Slider>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const onChangeSlide = (index: number) => {
    timerRef.current && clearTimeout(timerRef.current);
  };
  const isMemorized = (id: number, status: boolean) => {
    setCardData(prev => ({
      ...prev,
      p01: {
        ...prev.p01,
        wordList: prev.p01.wordList.map(word => (word.id === id ? { ...word, memorized: status } : word)),
      },
    }));
  };
  const contentTabIndexMinimum = 101;
  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='center'>
      <Box vAlign='center' hAlign='center' useFull>
        <Box padding='48px 16px' width='680px' borderRadius='24px' background='white' hAlign='center' useShadow>
          <Carousel
            data={cardData.p01.wordList}
            slideWidth={536}
            dots={false}
            infinite={true}
            arrowGap={-50}
            arrowSize={40}
            ref={sliderRef}
            onChange={onChangeSlide}
          >
            {cardData.p01.wordList.map(({ id, meaning, memorized, word, path }, index) => {
              const audioTabIndex = contentTabIndexMinimum + index * 2;
              const memorizedTabIndex = contentTabIndexMinimum + index * 2 + 1;
              return (
                <Box key={`voca-${index}`} height='263px' width='100%'>
                  <Box flexDirection='column' hAlign='center'>
                    <SimpleAudioPlayer audioSrc={path} tabIndex={audioTabIndex} id={`${id}`} />
                    <Box width='100%' marginBottom={4} overflowWrap='break-word'>
                      <Typography width='100%' align='center' fontSize='var(--font-size-36)' lineHeight='50px' weight='var(--font-weight-bold)'>
                        {word}
                      </Typography>
                    </Box>
                    <Typography useGap={false}>{meaning}</Typography>
                  </Box>
                  <Box marginTop={24} hAlign='center'>
                    <Button
                      size={EStyleSizes.SMALL}
                      color={memorized ? EStyleButtonTypes.SUCCESS : EStyleButtonTypes.SECONDARY}
                      style={{ padding: '10px 12px' }}
                      useRound
                      onClick={() => isMemorized(id, true)}
                      tabIndex={memorizedTabIndex}
                    >
                      {memorized && (
                        <Box vAlign='center' marginRight='4px'>
                          <SvgIcon size='20px' src={memorized ? CheckSuccess : ''} alt='다 외웠어요' />
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

export default P01;