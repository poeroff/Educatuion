import { useEffect, useMemo, useState } from 'react';
import { BoxWrap, TMainHeaderInfoTypes, EStyleShadowedButtonTypes, Box, Mark } from '@maidt-cntn/ui';
import { ShadowedButton, Container } from '@maidt-cntn/ui/en';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Word List',
    headerPattern: 'text',
  };
  const questionInfo = {
    text: 'Match the words and meanings.',
  };

  const dictionary: { [key: string]: string } = useMemo(() => {
    return {
      evolve: '발달하다, 진화하다',
      colleague: '동료',
      cooperate: '협력하다, 협조하다',
      extinction: '멸종',
      superior: '우수한',
      attribute: '공헌하다',
      species: '종',
      occasionally: '가끔',
      'get along': '어울리다',
      genetically: '유전 공학적인',
    };
  }, []);
  const wordList = useMemo(
    () => [
      { word: 'evolve', isCorrect: false },
      { word: 'colleague', isCorrect: false },
      { word: 'cooperate', isCorrect: false },
      { word: 'extinction', isCorrect: false },
      { word: 'superior', isCorrect: false },
      { word: 'attribute', isCorrect: false },
      { word: 'species', isCorrect: false },
      { word: 'occasionally', isCorrect: false },
      { word: 'get along', isCorrect: false },
      { word: 'genetically', isCorrect: false },
    ],
    [],
  );
  const meaningList = useMemo(
    () => [
      { meaning: '종', isCorrect: false },
      { meaning: '협력하다, 협조하다', isCorrect: false },
      { meaning: '멸종', isCorrect: false },
      { meaning: '가끔', isCorrect: false },
      { meaning: '발달하다, 진화하다', isCorrect: false },
      { meaning: '어울리다', isCorrect: false },
      { meaning: '유전 공학적인', isCorrect: false },
      { meaning: '공헌하다', isCorrect: false },
      { meaning: '우수한', isCorrect: false },
      { meaning: '동료', isCorrect: false },
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

export default P03;
