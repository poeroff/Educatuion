import { useEffect, useMemo, useState } from 'react';
import { BoxWrap, TMainHeaderInfoTypes, EStyleShadowedButtonTypes, Box, Mark } from '@maidt-cntn/ui';
import { ShadowedButton, Container } from '@maidt-cntn/ui/en';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Word List',
    headerPattern: 'text',
  };
  const questionInfo = {
    text: 'Match the words and meanings.',
  };

  const dictionary: { [key: string]: string } = useMemo(() => {
    return {
      evolutionary: '진화의, 점진적인',
      fascinating: '흥미로운, 매력적인',
      conduct: '지휘하다',
      anthropologist: '인류학자',
      'at random': '무작위로',
      conclude: '결론을 내리다',
      companion: '동반자, 동행',
      ancestor: '조상, 선조',
      behavior: '행동',
      responsive: '즉각 반응하는',
    };
  }, []);
  const wordList = useMemo(
    () => [
      { word: 'evolutionary', isCorrect: false },
      { word: 'fascinating', isCorrect: false },
      { word: 'conduct', isCorrect: false },
      { word: 'anthropologist', isCorrect: false },
      { word: 'at random', isCorrect: false },
      { word: 'conclude', isCorrect: false },
      { word: 'companion', isCorrect: false },
      { word: 'ancestor', isCorrect: false },
      { word: 'behavior', isCorrect: false },
      { word: 'responsive', isCorrect: false },
    ],
    [],
  );
  const meaningList = useMemo(
    () => [
      { meaning: '행동', isCorrect: false },
      { meaning: '무작위로', isCorrect: false },
      { meaning: '즉각 반응하는', isCorrect: false },
      { meaning: '인류학자', isCorrect: false },
      { meaning: '동반자, 동행', isCorrect: false },
      { meaning: '진화의, 점진적인', isCorrect: false },
      { meaning: '결론을 내리다', isCorrect: false },
      { meaning: '조상, 선조', isCorrect: false },
      { meaning: '흥미로운, 매력적인', isCorrect: false },
      { meaning: '지휘하다', isCorrect: false },
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

export default P02;
