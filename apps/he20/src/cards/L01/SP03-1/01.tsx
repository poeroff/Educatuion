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
import { L01SP03_1 } from './store';

const P01 = () => {
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
      { id: 1, word: 'rescue', meaning: '구조하다' },
      { id: 2, word: 'injured', meaning: '다친' },
      { id: 3, word: 'abuse', meaning: '학대하다' },
      { id: 4, word: 'set out', meaning: '출발하다' },
      { id: 5, word: 'in charge of', meaning: '~을 책임지는' },
      { id: 6, word: 'facility', meaning: '시설' },
      { id: 7, word: 'habitat', meaning: '서식지' },
      { id: 8, word: 'hazard', meaning: '위험' },
      { id: 9, word: 'sugarcane', meaning: '사탕수수' },
      { id: 10, word: 'rewarding', meaning: '보람 있는' },
      { id: 11, word: 'restore', meaning: '회복하다' },
      { id: 12, word: 'instinct', meaning: '본능' },
      { id: 13, word: 'carry out', meaning: '실행하다' },
      { id: 14, word: 'enrichment', meaning: '풍부화' },
      { id: 15, word: 'feeder', meaning: '먹이통' },
      { id: 16, word: 'lack', meaning: '부족하다' },
      { id: 17, word: 'mental', meaning: '정신의' },
      { id: 18, word: 'stimulation', meaning: '자극' },
      { id: 19, word: 'treatment', meaning: '치료' },
      { id: 20, word: 'spine', meaning: '척추' },
      { id: 21, word: 'take part in', meaning: '~에 참석하다' },
      { id: 22, word: 'reinforcement', meaning: '강화' },
      { id: 23, word: 'involve', meaning: '포함하다' },
      { id: 24, word: 'desirable', meaning: '바람직한' },
      { id: 25, word: 'emergency', meaning: '응급상황' },
      { id: 26, word: 'dehydrated', meaning: '탈수된' },
      { id: 27, word: 'veterinarian', meaning: '수의사' },
      { id: 28, word: 'inject', meaning: '주사하다' },
      { id: 29, word: 'recovery', meaning: '회복하다' },
      { id: 30, word: 'reflect', meaning: '생각해보다' },
      { id: 31, word: 'welfare', meaning: '복지' },
    ];
    return wordList.map(word => ({ ...word, path: `/L01/SP03-1/HE2-L01-SP03-1-voca_${word.word.toString().replace(/\s/gi, '_')}.mp3` }));
  }, []);

  const [cardData, setCardData] = useRecoilState(L01SP03_1);

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
                <Box key={`voca-${index}`} height='233px' width='100%'>
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
