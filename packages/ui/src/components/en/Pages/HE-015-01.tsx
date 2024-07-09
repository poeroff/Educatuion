import { Box, BoxWrap, EStyleShadowedButtonTypes, IQuestionProps, Mark, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { Container, ShadowedButton } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
interface IHE01501 {
  dictionary: { [key: string]: string };
  wordList: { word: string; isCorrect: boolean }[];
  meaningList: { meaning: string; isCorrect: boolean }[];
  headerInfo?: TMainHeaderInfoTypes;
  questionInfo?: IQuestionProps;
  handleChange?: (index: number) => void;
}
const HE01501 = ({
  dictionary,
  meaningList,
  wordList,
  headerInfo = {
    headerText: 'Word List',
    headerPattern: 'text',
  },
  questionInfo = {
    text: 'Match the words and meanings.',
  },
  handleChange,
}: IHE01501) => {
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

      if (dictionary[clickedWord] === clickedMeaning) {
        handleChange && handleChange(wordList.findIndex(word => word.word === clickedWord));
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
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='center'>
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
                !showSign && setClickedWord(item.word);
              }}
              ariaLabel={`${index + 1} 번째 영어단어`}
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
              maxWordLength={15}
              onClick={() => {
                !showSign && setClickedMeaning(item.meaning);
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

export default HE01501;
