import HE01401 from '@maidt-cntn/pages/HE-014-01';
import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { useMemo } from 'react';
import { pageIdsAtom } from '@/stores/page';
import { SL1C01A02 } from './store';
import { useRecoilValue, useRecoilState } from 'recoil';

const P01 = () => {
  const pageKey = 'p01';
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(SL1C01A02);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Word List',
  };

  const questionInfo: IQuestionProps = {
    text: '본문에 등장하는 어휘를 미리 학습 해 봅시다.',
  };

  const initWordList = useMemo(() => {
    return cardData[pageKey].map(word => ({ ...word, path: `/SL1/C01/A02/ME1-SL1-C01-A02-voca_${word.word.replace(/\s/g, '')}.mp3` }));
  }, [pageIds]);

  const handleChange = (index: number, status: boolean) => {
    setCardData(prev => ({
      ...prev,
      [pageKey]: prev[pageKey].map((item, idx) => (item.id === index ? { ...item, isMemorized: status } : item)),
    }));
  };

  return <HE01401 initWordList={initWordList} headerInfo={headerInfo} handleChange={handleChange} questionInfo={questionInfo} />;
};

export default P01;
