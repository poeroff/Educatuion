import HE01501 from '@maidt-cntn/pages/HE-015-01';
import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { useMemo } from 'react';
import { pageIdsAtom } from '@/stores/page';
import { L01SCP0101 } from './store';
import { useRecoilValue, useRecoilState } from 'recoil';

const P02 = () => {
  const pageKey = 'p02';
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01SCP0101);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'listenAndSpeakENG',
    headerText: '단어 연습',
  };

  const questionInfo: IQuestionProps = {
    text: '단어와 뜻을 알맞게 짝지어 봅시다.',
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
    <HE01501
      dictionary={dictionary}
      wordList={englishWordList}
      meaningList={meaningList}
      headerInfo={headerInfo}
      handleChange={handleChange}
      questionInfo={questionInfo}
    />
  );
};

export default P02;
