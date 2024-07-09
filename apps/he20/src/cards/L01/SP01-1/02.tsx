import { Box, BoxWrap, EStyleShadowedButtonTypes, Mark, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { Container, ShadowedButton } from '@maidt-cntn/ui/en';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import { L01SP01_1 } from './store';

const P02 = () => {
  const [cardData, setCardData] = useRecoilState(L01SP01_1);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 단어 연습',
    headerPattern: 'text',
  };

  const questionInfo = {
    text: 'Match the words and meanings.',
  };

  const wordList = useMemo(
    () => [
      { id: 1, word: 'volunteer', meaning: '자원봉사 하다', meaningOrder: 6 },
      { id: 2, word: 'construction', meaning: '건설', meaningOrder: 5 },
      { id: 3, word: 'come along', meaning: '함께 가다', meaningOrder: 4 },
      { id: 4, word: 'well-being', meaning: '건강', meaningOrder: 9 },
      { id: 5, word: 'charity', meaning: '자선', meaningOrder: 1 },
      { id: 6, word: 'adopt', meaning: '입양하다', meaningOrder: 10 },
      { id: 7, word: 'mobile', meaning: '이동하는', meaningOrder: 2 },
      { id: 8, word: 'sensitive', meaning: '예민한', meaningOrder: 3 },
      { id: 9, word: 'countless', meaning: '셀 수 없이 많은', meaningOrder: 8 },
      { id: 10, word: 'translator', meaning: '번역기', meaningOrder: 7 },
    ],
    [],
  );

  interface IP02 {
    dictionary: { [key: string]: string };
    englishWordList: { word: string; isCorrect: boolean }[];
    meaningList: { meaning: string; isCorrect: boolean }[];
  }

  const { dictionary, englishWordList, meaningList } = useMemo<IP02>(() => {
    const dictionary = wordList.reduce((acc, cur) => {
      return { ...acc, [cur.word]: cur.meaning };
    }, {});
    const englishWordList = wordList.map(word => ({ word: word.word, isCorrect: false }));
    const meaningList = wordList
      .sort((a, b) => (a.meaningOrder ?? 0) - (b.meaningOrder ?? 0))
      .map(meaning => ({ meaning: meaning.meaning, isCorrect: false }));
    return { dictionary, englishWordList, meaningList };
  }, [wordList]);

  useEffect(() => {
    if (cardData.p02.englishWordList.length === 0) {
      setCardData(prev => {
        return {
          ...prev,
          p02: {
            ...prev.p02,
            dictionary: dictionary,
            englishWordList: englishWordList,
            meaningList: meaningList,
          },
        };
      });
    }
  }, []);

  const [clickedWord, setClickedWord] = useState<string | null>();
  const [clickedMeaning, setClickedMeaning] = useState<string | null>();
  const [showSign, setShowSign] = useState(false);

  useEffect(() => {
    if (clickedWord && clickedMeaning) {
      if (cardData.p02.dictionary[clickedWord] === clickedMeaning) {
        const clickedWordItem = cardData.p02.englishWordList.find(word => word.word === clickedWord);
        const clickedMeaningItem = cardData.p02.meaningList.find(word => word.meaning === clickedMeaning);
        if (clickedWordItem && clickedMeaningItem) {
          setCardData(prev => {
            const _englishWordList = prev.p02.englishWordList.map(word =>
              word.word === clickedWord
                ? {
                    ...word,
                    isCorrect: true,
                  }
                : word,
            );
            const _meaningList = prev.p02.meaningList.map(word =>
              word.meaning === clickedMeaning
                ? {
                    ...word,
                    isCorrect: true,
                  }
                : word,
            );
            return {
              ...prev,
              p02: {
                ...prev.p02,
                englishWordList: _englishWordList,
                meaningList: _meaningList,
              },
            };
          });
        }
      }
      setShowSign(true);
      setTimeout(() => {
        setShowSign(false);
        setClickedWord(null);
        setClickedMeaning(null);
      }, 1000);
    }
  }, [clickedWord, clickedMeaning, cardData.p02.dictionary, wordList]);

  const getGradingMark = (isCorrect: boolean) => {
    return <Mark size='large' type={isCorrect ? 'correct' : 'incorrect'} />;
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='flex-start'>
      <BoxWrap justifyContent='space-between'>
        <Box display={'grid'} gridTemplateColumns={'repeat(2, 1fr)'} gap={'20px'}>
          {cardData.p02.englishWordList.map((item, index) => (
            <ShadowedButton
              key={item.word}
              state={
                item.isCorrect
                  ? EStyleShadowedButtonTypes.SUCCESS
                  : showSign && clickedWord === item.word && cardData.p02.dictionary[clickedWord] !== clickedMeaning
                  ? EStyleShadowedButtonTypes.WARNING
                  : clickedWord === item.word
                  ? EStyleShadowedButtonTypes.PRIMARY
                  : EStyleShadowedButtonTypes.DEFAULT
              }
              tabIndex={102 + index}
              width={'184px'}
              height={'60px'}
              label={item.word}
              contentLength={item.word.length}
              fontSize='var(--font-size-24)'
              maxWordLength={14}
              onClick={() => {
                !showSign && setClickedWord(item.word);
              }}
            />
          ))}
        </Box>

        <Box display={'grid'} gridTemplateColumns={'repeat(2, 1fr)'} gap={'20px'}>
          {cardData.p02.meaningList.map((item, index) => (
            <ShadowedButton
              key={item.meaning}
              state={
                item.isCorrect
                  ? EStyleShadowedButtonTypes.SUCCESS
                  : showSign && clickedMeaning === item.meaning && cardData.p02.dictionary[clickedMeaning] !== clickedWord
                  ? EStyleShadowedButtonTypes.WARNING
                  : clickedMeaning === item.meaning
                  ? EStyleShadowedButtonTypes.PRIMARY
                  : EStyleShadowedButtonTypes.DEFAULT
              }
              tabIndex={102 + wordList.length + index}
              width={'184px'}
              height={'60px'}
              label={item.meaning}
              contentLength={item.meaning.length}
              fontSize='var(--font-size-24)'
              maxWordLength={15}
              onClick={() => {
                !showSign && setClickedMeaning(item.meaning);
              }}
            />
          ))}
        </Box>
      </BoxWrap>
      {showSign && clickedWord && getGradingMark(cardData.p02.dictionary[clickedWord] === clickedMeaning)}
    </Container>
  );
};

export default P02;
