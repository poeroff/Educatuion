import { pageIdsAtom } from '@/stores/page';
import HE01401 from '@maidt-cntn/pages/HE-014-01';
import { useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { HE10L04C05A04 } from './store';

const P01 = () => {
  const pageKey = 'p01';
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(HE10L04C05A04);

  const initWordList = useMemo(() => {
    return cardData[pageKey].map(word => ({ ...word, path: `/L04/C05/A04/HE1-L04-C05-A04-${word.id.toString().padStart(2, '0')}.mp3` }));
  }, [pageIds]);
  const handleChange = (index: number, status: boolean) => {
    setCardData(prev => ({
      ...prev,
      [pageKey]: prev[pageKey].map((item, idx) => (item.id === index ? { ...item, isMemorized: status } : item)),
    }));
  };
  return <HE01401 initWordList={initWordList} handleChange={handleChange} />;
};

export default P01;