import { pageIdsAtom } from '@/stores/page';
import HE01401 from '@maidt-cntn/pages/HE-014-01';
import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L05C06A02 } from './store';

const P01 = () => {
  const pageKey = 'p01';
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L05C06A02);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Word List',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '본문에 등장하는 어휘를 미리 학습 해 봅시다.',
  };

  const initWordList = useMemo(() => {
    return cardData[pageKey].map(word => ({ ...word }));
  }, [pageIds]);

  const handleChange = (index: number, status: boolean) => {
    setCardData(prev => ({
      ...prev,
      [pageKey]: prev[pageKey].map((item, idx) => (item.id === index ? { ...item, isMemorized: status } : item)),
    }));
  };

  return <HE01401 initWordList={initWordList} headerInfo={headerInfo} questionInfo={questionInfo} handleChange={handleChange} />;
};

export default P01;
