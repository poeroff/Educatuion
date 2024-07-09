import { pageIdsAtom } from '@/stores/page';
import HE01401 from '@maidt-cntn/pages/HE-014-01';
import { useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01C05A04 } from './store';

const P01 = () => {
  const pageKey = 'P01';
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C05A04);

  const initWordList = useMemo(() => {
    return cardData[pageKey].map(word => ({ ...word, path: `/L01/C05/A04/HE2-L01-C05-A04-${word.id.toString().padStart(2, '0')}.mp3` }));
  }, [pageIds]);

  const handleChange = (id: number, isMemorized: boolean) => {
    setCardData(prev => ({
      ...prev,
      [pageKey]: prev[pageKey].map(word => (word.id === id ? { ...word, isMemorized } : word)),
    }));
  };

  return <HE01401 initWordList={initWordList} handleChange={handleChange} />;
};

export default P01;
