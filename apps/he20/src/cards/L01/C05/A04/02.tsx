import { pageIdsAtom } from '@/stores/page';
import HE01501 from '@maidt-cntn/pages/HE-015-01';
import { useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01C05A04 } from './store';

const P02 = () => {
  const pageKey = 'P02';
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C05A04);

  const { dictionary, englishWordList, meaningList } = useMemo(() => {
    const dictionary = cardData[pageKey].reduce((acc, cur) => {
      return { ...acc, [cur.word]: cur.meaning };
    }, {});
    const englishWordList = cardData[pageKey].map(word => ({ word: word.word, isCorrect: word.isCorrect }));
    const meaningList = [...cardData[pageKey]]
      .sort((a, b) => (a.meaningOrder ?? 0) - (b.meaningOrder ?? 0))
      .map(meaning => ({ meaning: meaning.meaning, isCorrect: meaning.isCorrect }));
    return { dictionary, englishWordList, meaningList };
  }, [pageIds]);

  const handleChange = (index: number) => {
    setCardData(prev => ({
      ...prev,
      [pageKey]: prev[pageKey].map((item, idx) => (idx === index ? { ...item, isCorrect: true } : item)),
    }));
  };

  return <HE01501 dictionary={dictionary} wordList={englishWordList} meaningList={meaningList} handleChange={handleChange} />;
};

export default P02;
