import { useEffect, useMemo, useState } from 'react';
import { BoxWrap, TMainHeaderInfoTypes, EStyleShadowedButtonTypes, Box, Mark } from '@maidt-cntn/ui';
import { ShadowedButton, Container } from '@maidt-cntn/ui/en';

const P02 = ({ _page = 'P02' }: { _page?: string }) => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 단어 연습',
    headerPattern: 'text',
  };
  const questionInfo = {
    text: 'Match the words and meanings.',
  };

  const dictionary: { [key: string]: string } = useMemo(() => {
    return {
      translate: '번역하다',
      automatically: '자동으로',
      'high-tech': '첨단 기술의',
      target: '목표로 삼다',
      nutrient: '영양소',
      'be concerned about': '~을 걱정하다',
      laboratory: '실험실',
      'take the place of': '~을 대신하다',
      convenient: '편리한',
      arrange: '배열하다',
    };
  }, []);
  const wordList = useMemo(
    () => [
      { word: 'translate', isCorrect: false },
      { word: 'be concerned about', isCorrect: false },
      { word: 'automatically', isCorrect: false },
      { word: 'laboratory', isCorrect: false },
      { word: 'high-tech', isCorrect: false },
      { word: 'take the place of', isCorrect: false },
      { word: 'target', isCorrect: false },
      { word: 'convenient', isCorrect: false },
      { word: 'nutrient', isCorrect: false },
      { word: 'arrange', isCorrect: false },
    ],
    [],
  );
  const meaningList = useMemo(
    () => [
      { meaning: '자동으로', isCorrect: false },
      { meaning: '번역하다', isCorrect: false },
      { meaning: '실험실', isCorrect: false },
      { meaning: '첨단 기술의', isCorrect: false },
      { meaning: '목표로 삼다', isCorrect: false },
      { meaning: '영양소', isCorrect: false },
      { meaning: '~을 대신하다', isCorrect: false },
      { meaning: '편리한', isCorrect: false },
      { meaning: '~을 걱정하다', isCorrect: false },
      { meaning: '배열하다', isCorrect: false },
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
              key={item.word}
              state={
                item.isCorrect
                  ? EStyleShadowedButtonTypes.SUCCESS
                  : showSign && clickedWord === item.word && dictionary[clickedWord] !== clickedMeaning
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
                setClickedWord(item.word);
              }}
            />
          ))}
        </Box>

        <Box display={'grid'} gridTemplateColumns={'repeat(2, 1fr)'} gap={'20px'}>
          {meaningList.map((item, index) => (
            <ShadowedButton
              key={item.meaning}
              state={
                item.isCorrect
                  ? EStyleShadowedButtonTypes.SUCCESS
                  : showSign && clickedMeaning === item.meaning && dictionary[clickedMeaning] !== clickedWord
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

export default P02;
