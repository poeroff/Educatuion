import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01SP02 } from './store';
import { pageIdsAtom } from '@/stores/page';
import { useMemo } from 'react';
import HE01501 from '@maidt-cntn/pages/HE-015-01';

const P02 = () => {
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01SP02);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'listenAndSpeakENG',
    headerText: '단어 연습',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '단어와 뜻을 알맞게 짝지어 봅시다.',
  };

  const { dictionary, englishWordList, meaningList } = useMemo(() => {
    const dictionary =
      cardData.p02.initWordList?.reduce((acc, cur) => {
        return { ...acc, [cur.word as string]: cur.meaning };
      }, {}) ?? {};

    const englishWordList = cardData.p02.initWordList?.map(word => ({ word: word.word, isCorrect: word.isCorrect ?? false })) ?? [];

    const meaningList = [...(cardData.p02.initWordList ?? [])]
      .sort((a, b) => (a.meaningOrder ?? 0) - (b.meaningOrder ?? 0))
      .map(meaning => ({ meaning: meaning.meaning, isCorrect: meaning.isCorrect ?? false }));

    return { dictionary, englishWordList, meaningList };
  }, [pageIds]);

  const handleChange = (index: number) => {
    setCardData(prev => ({
      ...prev,
      p02: {
        ...prev.p02,
        initWordList: prev.p02.initWordList?.map((item, idx) => (idx === index ? { ...item, isCorrect: true } : item)) ?? [],
      },
    }));
  };

  return (
    <HE01501
      dictionary={dictionary}
      wordList={englishWordList}
      meaningList={meaningList}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      handleChange={handleChange}
    />
  );
};

export default P02;
