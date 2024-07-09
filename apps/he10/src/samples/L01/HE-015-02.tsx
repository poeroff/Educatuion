import { useEffect, useMemo, useState } from 'react';
import { BoxWrap, TMainHeaderInfoTypes, EStyleShadowedButtonTypes, Box, Mark } from '@maidt-cntn/ui';
import { ShadowedButton, Container } from '@maidt-cntn/ui/en';

const HE01502 = () => {
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
      peach: '복숭아',
      'Shine MuscatShine MuscatShine MuscatShine Muscat': '샤인머스켓샤인머스켓샤인머스켓샤인머스켓',
      strawberry: '딸기',
    };
  }, []);
  const wordList = useMemo(
    () => [
      { word: 'banana', isCorrect: false },
      { word: 'cherry', isCorrect: false },
      { word: 'kiwi', isCorrect: false },
      { word: 'peach', isCorrect: false },
      { word: 'apple', isCorrect: false },
      { word: 'Shine MuscatShine MuscatShine MuscatShine Muscat', isCorrect: false },
    ],
    [],
  );
  const meaningList = useMemo(
    () => [
      { meaning: '사과', isCorrect: false },
      { meaning: '바나나', isCorrect: false },
      { meaning: '체리', isCorrect: false },
      { meaning: '샤인머스켓샤인머스켓샤인머스켓샤인머스켓', isCorrect: false },
      { meaning: '키위', isCorrect: false },
      { meaning: '복숭아', isCorrect: false },
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
      <BoxWrap marginTop={'20px'} justifyContent='space-around'>
        <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
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
              width={'264px'}
              height={'60px'}
              label={item.word}
              contentLength={item.word.length}
              fontSize='var(--font-size-27)'
              maxWordLength={23}
              onClick={() => {
                setClickedWord(item.word);
              }}
            />
          ))}
        </Box>
        <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
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
              width={'264px'}
              height={'60px'}
              label={item.meaning}
              contentLength={item.meaning.length}
              fontSize='var(--font-size-27)'
              maxWordLength={15}
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

export default HE01502;
