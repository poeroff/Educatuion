import { useEffect, useMemo, useState } from 'react';
import { BoxWrap, TMainHeaderInfoTypes, EStyleShadowedButtonTypes, Box, Mark } from '@maidt-cntn/ui';
import { ShadowedButton, Container } from '@maidt-cntn/ui/en';

const P04 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Word List',
    headerPattern: 'text',
  };
  const questionInfo = {
    text: 'Match the words and meanings.',
  };

  const dictionary: { [key: string]: string } = useMemo(() => {
    return {
      bouquet: '부케, 꽃다발',
      cooperative: '협조적인',
      thrive: '번창하다',
      alternative: '대안, 선택 가능한 것',
      harmonize: '조화를 이루다, 어울리다',
      ultimately: '궁극적으로',
      competitive: '경쟁적인',
      locate: '위치하다, 설치하다',
      device: '장치',
      biologist: '생물학자',
    };
  }, []);
  const wordList = useMemo(
    () => [
      { word: 'bouquet', isCorrect: false },
      { word: 'cooperative', isCorrect: false },
      { word: 'thrive', isCorrect: false },
      { word: 'alternative', isCorrect: false },
      { word: 'harmonize', isCorrect: false },
      { word: 'ultimately', isCorrect: false },
      { word: 'competitive', isCorrect: false },
      { word: 'locate', isCorrect: false },
      { word: 'device', isCorrect: false },
      { word: 'biologist', isCorrect: false },
    ],
    [],
  );
  const meaningList = useMemo(
    () => [
      { meaning: '궁극적으로', isCorrect: false },
      { meaning: '장치', isCorrect: false },
      { meaning: '생물학자', isCorrect: false },
      { meaning: '위치하다, 설치하다', isCorrect: false },
      { meaning: '부케, 꽃다발', isCorrect: false },
      { meaning: '협조적인', isCorrect: false },
      { meaning: '번창하다', isCorrect: false },
      { meaning: '경쟁적인', isCorrect: false },
      { meaning: '대안, 선택 가능한 것', isCorrect: false },
      { meaning: '조화를 이루다, 어울리다', isCorrect: false },
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
              width={'200px'}
              height={'55px'}
              label={item.word}
              contentLength={item.word.length}
              fontSize='var(--font-size-24)'
              maxWordLength={14}
              onClick={() => {
                setClickedWord(item.word);
              }}
              ariaLabel={`${index + 1} 번째 영어단어`}
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
              width={'200px'}
              height={'55px'}
              label={item.meaning}
              contentLength={item.meaning.length}
              fontSize='var(--font-size-24)'
              maxWordLength={9}
              onClick={() => {
                setClickedMeaning(item.meaning);
              }}
              ariaLabel={`${index + 1} 번째 단어`}
            />
          ))}
        </Box>
      </BoxWrap>

      {showSign && clickedWord && getGradingMark(dictionary[clickedWord] === clickedMeaning)}
    </Container>
  );
};

export default P04;
