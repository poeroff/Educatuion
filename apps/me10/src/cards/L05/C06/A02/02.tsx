import { pageIdsAtom } from '@/stores/page';
import HE01501 from '@maidt-cntn/pages/HE-015-01';
import { IQuestionProps } from '@maidt-cntn/ui';
import { useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L05C06A02 } from './store';

const P02 = () => {
  const pageKey = 'p02';
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L05C06A02);

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '단어와 뜻이 서로 일치 되도록 매치 해 봅시다.',
  };

  const { dictionary, englishWordList, meaningList } = useMemo(() => {
    const dictionary = cardData[pageKey].reduce((acc, cur) => {
      return { ...acc, [cur.word as string]: cur.meaning };
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

  return (
    <HE01501 questionInfo={questionInfo} dictionary={dictionary} wordList={englishWordList} meaningList={meaningList} handleChange={handleChange} />
  );
};

export default P02;
