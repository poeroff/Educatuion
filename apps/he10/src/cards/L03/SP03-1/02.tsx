import { L03SP03_1 } from '@/cards/L03/SP03-1/store';
import { Box, BoxWrap, EStyleShadowedButtonTypes, Mark, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { Container, ShadowedButton } from '@maidt-cntn/ui/en';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 단어 연습',
    headerPattern: 'text',
  };

  const questionInfo = {
    text: 'Match the words and meanings.',
  };

  const wordList = useMemo(
    () => [
      { id: 1, word: 'unwanted', meaning: '원하지 않는', meaningOrder: 6 },
      { id: 2, word: 'opposite', meaning: '반대의', meaningOrder: 9 },
      { id: 3, word: 'examine', meaning: '살펴 보다', meaningOrder: 2 },
      { id: 4, word: 'eliminate', meaning: '제거하다', meaningOrder: 8 },
      { id: 5, word: 'string', meaning: '줄', meaningOrder: 10 },
      { id: 6, word: 'predictable', meaning: '예측 가능한', meaningOrder: 4 },
      { id: 7, word: 'constructive', meaning: '보강의', meaningOrder: 7 },
      { id: 8, word: 'application', meaning: '적용', meaningOrder: 5 },
      { id: 9, word: 'valley', meaning: '골짜기', meaningOrder: 1 },
      { id: 10, word: 'agent', meaning: '대리인', meaningOrder: 3 },
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

  const [cardData, setCardData] = useRecoilState(L03SP03_1);

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

  // return <HE01501 headerInfo={headerInfo} dictionary={dictionary} wordList={englishWordList} meaningList={meaningList} />;

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
            const _englishWordList = prev.p02.englishWordList.map(word => (word.word === clickedWord ? { ...word, isCorrect: true } : word));
            const _meaningList = prev.p02.meaningList.map(word => (word.meaning === clickedMeaning ? { ...word, isCorrect: true } : word));
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
