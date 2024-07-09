import { L03SP03_1 } from '@/cards/L03/SP03-1/store';
import CheckSuccess from '@maidt-cntn/assets/icons/check_succes.svg';
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
      { id: 1, word: 'unpleasant', meaning: '불쾌한', file: 'HE1-L03-SP03-1-voca_unpleasant.mp3' },
      { id: 2, word: 'distracting', meaning: '산만하게 하는', file: 'HE1-L03-SP03-1-voca_distracting.mp3' },
      { id: 3, word: 'unwanted', meaning: '원하지 않는', file: 'HE1-L03-SP03-1-voca_unwanted.mp3' },
      { id: 4, word: 'principle', meaning: '원리', file: 'HE1-L03-SP03-1-voca_principle.mp3' },
      { id: 5, word: 'achievement', meaning: '성취', file: 'HE1-L03-SP03-1-voca_achievement.mp3' },
      { id: 6, word: 'examine', meaning: '살펴 보다', file: 'HE1-L03-SP03-1-voca_examine.mp3' },
      { id: 7, word: 'interference', meaning: '간섭', file: 'HE1-L03-SP03-1-voca_interference.mp3' },
      { id: 8, word: 'vibration', meaning: '진동', file: 'HE1-L03-SP03-1-voca_vibration.mp3' },
      { id: 9, word: 'string', meaning: '줄', file: 'HE1-L03-SP03-1-voca_string.mp3' },
      { id: 10, word: 'ripple', meaning: '잔물결', file: 'HE1-L03-SP03-1-voca_ripple.mp3' },
      { id: 11, word: 'interpret', meaning: '해석하다', file: 'HE1-L03-SP03-1-voca_interpret.mp3' },
      { id: 12, word: 'overlap', meaning: '겹치다', file: 'HE1-L03-SP03-1-voca_overlap.mp3' },
      { id: 13, word: 'constructive', meaning: '보강의', file: 'HE1-L03-SP03-1-voca_constructive.mp3' },
      { id: 14, word: 'destructive', meaning: '상쇄의', file: 'HE1-L03-SP03-1-voca_destructive.mp3' },
      { id: 15, word: 'peak', meaning: '정점', file: 'HE1-L03-SP03-1-voca_peak.mp3' },
      { id: 16, word: 'valley', meaning: '골짜기', file: 'HE1-L03-SP03-1-voca_valley.mp3' },
      { id: 17, word: 'circuitry', meaning: '회로', file: 'HE1-L03-SP03-1-voca_circuitry.mp3' },
      { id: 18, word: 'analyze', meaning: '분석하다', file: 'HE1-L03-SP03-1-voca_analyze.mp3' },
      { id: 19, word: 'opposite', meaning: '반대의', file: 'HE1-L03-SP03-1-voca_opposite.mp3' },
      { id: 20, word: 'value', meaning: '값', file: 'HE1-L03-SP03-1-voca_value.mp3' },
      { id: 21, word: 'transmit', meaning: '전송하다', file: 'HE1-L03-SP03-1-voca_transmit.mp3' },
      { id: 22, word: 'surrounding', meaning: '환경', file: 'HE1-L03-SP03-1-voca_surrounding.mp3' },
      { id: 23, word: 'eliminate', meaning: '제거하다', file: 'HE1-L03-SP03-1-voca_eliminate.mp3' },
      { id: 24, word: 'external', meaning: '외부의', file: 'HE1-L03-SP03-1-voca_external.mp3' },
      { id: 25, word: 'convert', meaning: '전환하다', file: 'HE1-L03-SP03-1-voca_convert.mp3' },
      { id: 26, word: 'predictable', meaning: '예측가능한', file: 'HE1-L03-SP03-1-voca_predictable.mp3' },
      { id: 27, word: 'inconsistent', meaning: '일관성 없는', file: 'HE1-L03-SP03-1-voca_inconsistent.mp3' },
      { id: 29, word: 'application', meaning: '적용', file: 'HE1-L03-SP03-1-voca_application.mp3' },
      { id: 30, word: 'take advantage of', meaning: '~을 이용하다', file: 'HE1-L03-SP03-1-voca_take_advantage_of.mp3' },
      { id: 31, word: 'attraction', meaning: '명소', file: 'HE1-L03-SP03-1-voca_attraction.mp3' },
      { id: 32, word: 'detect', meaning: '발견하다', file: 'HE1-L03-SP03-1-voca_detect.mp3' },
      { id: 33, word: 'agent', meaning: '대리인', file: 'HE1-L03-SP03-1-voca_agent.mp3' },
      { id: 34, word: 'disturb', meaning: '방해하다', file: 'HE1-L03-SP03-1-voca_disturb.mp3' },
      { id: 35, word: 'advance', meaning: '발전하다', file: 'HE1-L03-SP03-1-voca_advance.mp3' },
      { id: 36, word: 'conflict', meaning: '갈등', file: 'HE1-L03-SP03-1-voca_conflict.mp3' },
      { id: 37, word: 'resident', meaning: '거주민', file: 'HE1-L03-SP03-1-voca_resident.mp3' },
    ];
    return wordList.map(word => ({ ...word, path: `/L03/SP03-1/${word.file}` }));
  }, []);

  const [cardData, setCardData] = useRecoilState(L03SP03_1);

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
      <Box hAlign='center' useFull>
        <Box padding='48px 16px' width='680px' borderRadius='24px' background='white' hAlign='center' useShadow>
          <Carousel data={cardData.p01.wordList} slideWidth={536} dots={false} arrowGap={-50} arrowSize={40} ref={sliderRef} onChange={onChangeSlide}>
            {cardData.p01.wordList.map(({ id, meaning, memorized, word, path }, index) => {
              const audioTabIndex = contentTabIndexMinimum + index * 2;
              const memorizedTabIndex = contentTabIndexMinimum + index * 2 + 1;
              return (
                <Box key={`voca-${index}`}>
                  <Box flexDirection='column' vAlign='center'>
                    <SimpleAudioPlayer audioSrc={path} tabIndex={audioTabIndex} id={`${id}`} />
                    <Box width='100%' marginBottom={4} overflowWrap='break-word'>
                      <Typography
                        // size={EStyleFontSizes.LARGE}
                        width='100%'
                        align='center'
                        fontSize='var(--font-size-36)'
                        lineHeight='50px'
                        weight='var(--font-weight-bold)'
                      >
                        {word}
                      </Typography>
                    </Box>
                    <Typography useGap={false} tabIndex={memorizedTabIndex}>
                      {meaning}
                    </Typography>
                  </Box>

                  <Box marginTop={10} hAlign='center'>
                    <Button
                      size={EStyleSizes.SMALL}
                      color={memorized ? EStyleButtonTypes.SUCCESS : EStyleButtonTypes.SECONDARY}
                      style={{ padding: '10px 12px' }}
                      useRound
                      onClick={() => isMemorized(id, true)}
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

export default P01;
