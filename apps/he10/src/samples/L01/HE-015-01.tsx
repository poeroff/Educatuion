import { useEffect, useMemo, useState } from 'react';
import { BoxWrap, TMainHeaderInfoTypes, EStyleShadowedButtonTypes, Box, Mark } from '@maidt-cntn/ui';
import { ShadowedButton, Container } from '@maidt-cntn/ui/en';

const HE01501 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Word List',
    headerPattern: 'text',
  };
  const questionInfo = {
    text: 'Match the words and meanings.',
  };

  const dictionary: { [key: string]: string } = useMemo(() => {
    return {
      apple: '사과',
      banana: '바나나',
      cherry: '체리',
      grape: '포도',
      kiwi: '키위',
      lemon: '레몬',
      orange: '오렌지',
      peach: '복숭아',
      'Shine Muscat': '샤인머스켓',
      strawberry: '딸기',
    };
  }, []);
  const wordList = useMemo(
    () => [
      { word: 'banana', isCorrect: false },
      { word: 'strawberry', isCorrect: false },
      { word: 'cherry', isCorrect: false },
      { word: 'kiwi', isCorrect: false },
      { word: 'grape', isCorrect: false },
      { word: 'peach', isCorrect: false },
      { word: 'orange', isCorrect: false },
      { word: 'apple', isCorrect: false },
      { word: 'lemon', isCorrect: false },
      { word: 'Shine Muscat', isCorrect: false },
    ],
    [],
  );
  const meaningList = useMemo(
    () => [
      { meaning: '사과', isCorrect: false },
      { meaning: '바나나', isCorrect: false },
      { meaning: '체리', isCorrect: false },
      { meaning: '포도', isCorrect: false },
      { meaning: '키위', isCorrect: false },
      { meaning: '레몬', isCorrect: false },
      { meaning: '오렌지', isCorrect: false },
      { meaning: '복숭아', isCorrect: false },
      { meaning: '샤인머스켓', isCorrect: false },
      { meaning: '딸기', isCorrect: false },
    ],
    [],
  );

  const [clickedWord, setClickedWord] = useState<string | null>();
  const [clickedMeaning, setClickedMeaning] = useState<string | null>();
  const [showSign, setShowSign] = useState(false);

  useEffect(() => {
    if (clickedWord && clickedMeaning) {
      if (dictionary[clickedWord] === clickedMeaning) {
        const clickedWordItem = wordList.find(word => word.word === clickedWord);
        const clickedMeaningItem = meaningList.find(word => word.meaning === clickedMeaning);
        if (clickedWordItem) {
          clickedWordItem.isCorrect = true;
        }
        if (clickedMeaningItem) {
          clickedMeaningItem.isCorrect = true;
        }
      }
      setShowSign(true);
      setTimeout(() => {
        setShowSign(false);
        setClickedWord(null);
        setClickedMeaning(null);
      }, 1000);
    }
  }, [clickedWord, clickedMeaning, dictionary, wordList, meaningList]);

  const getGradingMark = (isCorrect: boolean) => {
    return <Mark size='large' type={isCorrect ? 'correct' : 'incorrect'} />;
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='flex-start'>
      <BoxWrap justifyContent='space-between'>
        <Box display={'grid'} gridTemplateColumns={'repeat(2, 1fr)'} gap={'20px'}>
          {wordList.map((item, index) => (
            <ShadowedButton
              state={
                item.isCorrect
                  ? EStyleShadowedButtonTypes.SUCCESS
                  : showSign && clickedWord === item.word && dictionary[clickedWord] !== clickedMeaning
                  ? EStyleShadowedButtonTypes.WARNING
                  : clickedWord === item.word
                  ? EStyleShadowedButtonTypes.PRIMARY
                  : EStyleShadowedButtonTypes.DEFAULT
              }
              width={'184px'}
              height={'60px'}
              label={item.word}
              contentLength={item.word.length}
              fontSize='var(--font-size-24)'
              maxWordLength={14}
              onClick={() => {
                setClickedWord(item.word);
              }}
            />
          ))}
        </Box>

        <Box display={'grid'} gridTemplateColumns={'repeat(2, 1fr)'} gap={'20px'}>
          {meaningList.map((item, index) => (
            <ShadowedButton
              state={
                item.isCorrect
                  ? EStyleShadowedButtonTypes.SUCCESS
                  : showSign && clickedMeaning === item.meaning && dictionary[clickedMeaning] !== clickedWord
                  ? EStyleShadowedButtonTypes.WARNING
                  : clickedMeaning === item.meaning
                  ? EStyleShadowedButtonTypes.PRIMARY
                  : EStyleShadowedButtonTypes.DEFAULT
              }
              width={'184px'}
              height={'60px'}
              label={item.meaning}
              contentLength={item.meaning.length}
              fontSize='var(--font-size-24)'
              maxWordLength={9}
              onClick={() => {
                setClickedMeaning(item.meaning);
              }}
            />
          ))}
        </Box>
      </BoxWrap>

      {showSign && clickedWord && getGradingMark(dictionary[clickedWord] === clickedMeaning)}
    </Container>
  );
};

export default HE01501;
