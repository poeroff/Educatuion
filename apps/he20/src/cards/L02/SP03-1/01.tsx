import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Box,
  TMainHeaderInfoTypes,
  Typography,
  Carousel,
  SvgIcon,
  ESvgType,
  Button,
  EStyleButtonTypes,
  EStyleSizes,
  IQuestionProps,
  SimpleAudioPlayer,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { L02SP03_1 } from './store';

import CheckSuccess from '@maidt-cntn/assets/icons/check_succes.svg';
import Slider from 'react-slick';
import { useRecoilState } from 'recoil';

const P01 = () => {
  const [cardData, setCardData] = useRecoilState(L02SP03_1);
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 단어 암기',
    headerPattern: 'text',
  };

  const initWordList = useMemo(() => {
    const wordList = [
      { id: 1, word: 'light up', meaning: '밝히다', memorized: false },
      { id: 2, word: 'renewal', meaning: '갱신', memorized: false },
      { id: 3, word: 'trial', meaning: '체험', memorized: false },
      { id: 4, word: 'subscription', meaning: '구독', memorized: false },
      { id: 5, word: 'entertain', meaning: '즐겁게 하다', memorized: false },
      { id: 6, word: 'rush into', meaning: '급하게 ~하다', memorized: false },
      { id: 7, word: 'fall prey to', meaning: '~의 희생물이 되다', memorized: false },
      { id: 8, word: 'manipulative', meaning: '조종하는', memorized: false },
      { id: 9, word: 'trick into', meaning: '속여서 ~하게 하다', memorized: false },
      { id: 10, word: 'deceptive', meaning: '기만적인', memorized: false },
      { id: 11, word: 'forced', meaning: '강요된', memorized: false },
      { id: 12, word: 'continuity', meaning: '지속(성)', memorized: false },
      { id: 13, word: 'deliberately', meaning: '의도적으로', memorized: false },
      { id: 14, word: 'charge', meaning: '요금', memorized: false },
      { id: 15, word: 'shipping', meaning: '배송', memorized: false },
      { id: 16, word: 'confirm', meaning: '확인해 주다', memorized: false },
      { id: 17, word: 'shaming', meaning: '창피스럽게 만드는 것', memorized: false },
      { id: 18, word: 'ashamed', meaning: '부끄러운', memorized: false },
      { id: 19, word: 'request', meaning: '요청하다', memorized: false },
      { id: 20, word: 'appealing', meaning: '매력적인', memorized: false },
      { id: 21, word: 'complex', meaning: '복잡한', memorized: false },
      { id: 22, word: 'prevalent', meaning: '널리 퍼진', memorized: false },
      { id: 23, word: 'commerce', meaning: '상업', memorized: false },
      { id: 24, word: 'intensify', meaning: '심해지다', memorized: false },
      { id: 25, word: 'sneaky', meaning: '교활한', memorized: false },
      { id: 26, word: 'insist', meaning: '주장하다', memorized: false },
      { id: 27, word: 'critic', meaning: '비평가', memorized: false },
      { id: 28, word: 'valid', meaning: '유효한', memorized: false },
      { id: 29, word: 'leak', meaning: '유출', memorized: false },
      { id: 30, word: 'tackle', meaning: '(일, 문제 등을) 다루다', memorized: false },
      { id: 31, word: 'extensive', meaning: '광범위한', memorized: false },
      { id: 32, word: 'document', meaning: '~을 문서로 증명하다', memorized: false },
      { id: 33, word: 'ban', meaning: '금지하다', memorized: false },
      { id: 34, word: 'sufficient', meaning: '충분한', memorized: false },
      { id: 35, word: 'combat', meaning: '싸우다', memorized: false },
    ];
    return wordList.map(word => ({ ...word, path: `/L02/SP03-1/HE2-L02-SP03-1-voca_${word.word.replace(/ /g, '_')}.mp3` }));
  }, []);

  const questionInfo: IQuestionProps = {};
  const contentTabIndexMinimum = 101;

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
    console.log(cardData.p01.wordList);
    setCardData(prev => ({
      ...prev,
      p01: {
        ...prev.p01,
        wordList: prev.p01.wordList.map(word => (word.id === id ? { ...word, memorized: status } : word)),
      },
    }));
  };

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
                      {memorized ? '다 외웠어요!' : '다 외웠나요?'}
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
