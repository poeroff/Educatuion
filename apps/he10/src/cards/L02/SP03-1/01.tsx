import { L02SP03_1 } from '@/cards/L02/SP03-1/store';
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
      { id: 1, word: 'gather', meaning: '모으다' },
      { id: 2, word: 'faintly', meaning: '희미하게' },
      { id: 3, word: 'sigh', meaning: '한숨' },
      { id: 4, word: 'genealogy', meaning: '족보' },
      { id: 5, word: 'run through', meaning: '휩쓸다' },
      { id: 6, word: 'destroy', meaning: '파괴하다' },
      { id: 7, word: 'in despair', meaning: '절망에 빠져서' },
      { id: 8, word: 'ash', meaning: '재' },
      { id: 9, word: 'shaky', meaning: '흔들리는' },
      { id: 10, word: 'chant', meaning: '낭송' },
      { id: 11, word: 'burst', meaning: '(눈물‧웃음 등을) 터뜨리다' },
      { id: 12, word: 'thin', meaning: '여윈' },
      { id: 13, word: 'painful', meaning: '고통스러운' },
      { id: 14, word: 'cannot help but', meaning: '~할 수 밖에 없었다' },
      { id: 15, word: 'set off', meaning: '출발하다' },
      { id: 16, word: 'lift up', meaning: '올리다' },
      { id: 17, word: 'stare at', meaning: '~을 쳐다보다' },
      { id: 18, word: 'recall', meaning: '회상하다' },
    ];
    return wordList.map(word => ({ ...word, path: `/L02/SP03-1/HE1-L02-SP03-1-voca_${word.word.toString().replace(/\s/gi, '_')}.mp3` }));
  }, []);

  const [cardData, setCardData] = useRecoilState(L02SP03_1);

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
