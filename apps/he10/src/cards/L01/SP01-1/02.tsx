import HE01501 from '@maidt-cntn/pages/HE-015-01';
import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { useCallback, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import L01SP011State from './store';

const P02 = () => {
  const [cardData, setCardData] = useRecoilState(L01SP011State);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 단어 연습',
    headerPattern: 'text',
  };

  const { dictionary, englishWordList, meaningList } = useMemo(() => {
    const dictionary =
      cardData.p02?.reduce((acc, cur) => {
        return { ...acc, [cur.word]: cur.meaning };
      }, {}) ?? {};
    const englishWordList = cardData.p02?.map(word => ({ word: word.word, isCorrect: word.isCorrect })) ?? [];
    const meaningList = (cardData.p02 ? [...cardData.p02] : [])
      .sort((a, b) => a.meaningOrder - b.meaningOrder)
      .map(meaning => ({ meaning: meaning.meaning, isCorrect: meaning.isCorrect }));

    return { dictionary, englishWordList, meaningList };
  }, [cardData.p02]);

  const handleChange = useCallback(
    (index: number) => {
      setCardData(prev => ({
        ...prev,
        p02: prev.p02?.map((item, idx) => (idx === index ? { ...item, isCorrect: true } : item)),
      }));
    },
    [setCardData],
  );

  return <HE01501 dictionary={dictionary} wordList={englishWordList} meaningList={meaningList} headerInfo={headerInfo} handleChange={handleChange} />;
};

export default P02;
