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
      { id: 1, word: 'spotlight', meaning: '스포트라이트', file: 'HE2-L03-SP03-1-voca_spotlight.mp3' },
      { id: 2, word: 'docent', meaning: '(박물관 등의) 안내원', file: 'HE2-L03-SP03-1-voca_docent.mp3' },
      { id: 3, word: 'exhibit', meaning: '전시', file: 'HE2-L03-SP03-1-voca_exhibit.mp3' },
      { id: 4, word: 'unique', meaning: '독특한', file: 'HE2-L03-SP03-1-voca_unique.mp3' },
      { id: 5, word: 'slavery', meaning: '노예', file: 'HE2-L03-SP03-1-voca_slavery.mp3' },
      { id: 6, word: 'discrimination', meaning: '차별', file: 'HE2-L03-SP03-1-voca_discrimination.mp3' },
      { id: 7, word: 'mean', meaning: '비열한', file: 'HE2-L03-SP03-1-voca_mean.mp3' },
      { id: 8, word: 'in contrast', meaning: '대조적으로', file: 'HE2-L03-SP03-1-voca_in_contrast.mp3' },
      { id: 9, word: 'portray', meaning: '묘사하다', file: 'HE2-L03-SP03-1-voca_portray.mp3' },
      { id: 10, word: 'capture', meaning: '포착하다', file: 'HE2-L03-SP03-1-voca_capture.mp3' },
      { id: 11, word: 'freedom', meaning: '자유', file: 'HE2-L03-SP03-1-voca_freedom.mp3' },
      { id: 12, word: 'renowned', meaning: '유명한', file: 'HE2-L03-SP03-1-voca_renowned.mp3' },
      { id: 13, word: 'distorted', meaning: '뒤틀린', file: 'HE2-L03-SP03-1-voca_distorted.mp3' },
      { id: 14, word: 'mobility', meaning: '이동성', file: 'HE2-L03-SP03-1-voca_mobility.mp3' },
      { id: 15, word: 'depict', meaning: '묘사하다', file: 'HE2-L03-SP03-1-voca_depict.mp3' },
      { id: 16, word: 'landscape', meaning: '풍경', file: 'HE2-L03-SP03-1-voca_landscape.mp3' },
      { id: 17, word: 'innovative', meaning: '혁신적인', file: 'HE2-L03-SP03-1-voca_innovative.mp3' },
      { id: 18, word: 'confine', meaning: '가두다', file: 'HE2-L03-SP03-1-voca_confine.mp3' },
      { id: 19, word: 'iconic', meaning: '상징적인', file: 'HE2-L03-SP03-1-voca_iconic.mp3' },
      { id: 20, word: 'persist', meaning: '끈질기게 계속하다', file: 'HE2-L03-SP03-1-voca_persist.mp3' },
      { id: 21, word: 'solely', meaning: '오로지', file: 'HE2-L03-SP03-1-voca_solely.mp3' },
      { id: 22, word: 'era', meaning: '시대', file: 'HE2-L03-SP03-1-voca_era.mp3' },
      { id: 23, word: 'showcase', meaning: '소개하다', file: 'HE2-L03-SP03-1-voca_showcase.mp3' },
      { id: 24, word: 'stunningly', meaning: '굉장히 아름답게', file: 'HE2-L03-SP03-1-voca_stunningly.mp3' },
      { id: 25, word: 'conventional', meaning: '관습적인', file: 'HE2-L03-SP03-1-voca_conventional.mp3' },
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
