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
const HE01401 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Word List',
    headerPattern: 'text',
  };
  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'Check out the vocabulary from the main text in advance.',
  };
  const [wordList, setWordList] = useState<IVoca[]>(mockData);

  // audio
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioSrc, setAudioSrc] = useState('');

  const getAudioSrc = (id: number) => {
    return `/L01/C05/A04/HE1-L01-C05-A04-${id.toString().padStart(2, '0')}.mp3`;
  };

  useEffect(() => {
    if (!audioRef.current) return;
    if (audioSrc && isPlaying) {
      audioRef.current.play();
    }
  }, [audioSrc, isPlaying]);

  const sliderRef = useRef<Slider>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const onChangeSlide = (index: number) => {
    timerRef.current && clearTimeout(timerRef.current);
  };
  const isMemorized = (id: number) => {
    setWordList(wordList.map(word => (word.id === id ? { ...word, memorized: !word.memorized } : word)));
    if (sliderRef && timerRef) {
      timerRef.current = setTimeout(() => {
        sliderRef.current?.slickNext();
      }, 2500);
    }
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='center'>
      <Box hAlign='center' useFull>
        <Box padding='48px 16px' width='680px' borderRadius='24px' background='white' hAlign='center' useShadow>
          <Carousel data={wordList} slideWidth={536} dots={false} arrowGap={-50} arrowSize={40} ref={sliderRef} onChange={onChangeSlide}>
            {wordList.map((item, index) => (
              <Box key={`voca-${index}`}>
                <Box flexDirection='column' vAlign='center'>
                  <SimpleAudioPlayer audioSrc={getAudioSrc(index + 1)} id={`${index}`} />
                  <Box width='100%' marginBottom={4} overflowWrap='break-word'>
                    <Typography width='100%' align='center' fontSize='var(--font-size-36)' lineHeight='50px' weight='var(--font-weight-bold)'>
                      {item.word}
                    </Typography>
                  </Box>
                  <Typography>{item.meaning}</Typography>
                </Box>

                <Box marginTop={24} hAlign='center'>
                  <Button
                    size={EStyleSizes.SMALL}
                    color={item.memorized ? EStyleButtonTypes.SUCCESS : EStyleButtonTypes.SECONDARY}
                    style={{ padding: '10px 12px' }}
                    useRound
                    onClick={() => isMemorized(item.id)}
                  >
                    {item.memorized && (
                      <Box vAlign='center' marginRight='4px'>
                        <SvgIcon size='20px' src={item.memorized ? CheckSuccess : ''} alt='' />
                      </Box>
                    )}
                    다 외웠어요!
                  </Button>
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
  { id: 1, word: 'Pneumonoultramicroscopicsilicovolcanoconiosis', meaning: '진화의, 점진적인', memorized: false },
  { id: 2, word: 'at the very last moment', meaning: '생물학자', memorized: false },
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

export default HE01401;
