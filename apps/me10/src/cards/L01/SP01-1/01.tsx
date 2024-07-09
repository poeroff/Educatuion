import HE01401 from '@maidt-cntn/pages/HE-014-01';
import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { useMemo } from 'react';
import { pageIdsAtom } from '@/stores/page';
import { L01SCP0101 } from './store';
import { useRecoilValue, useRecoilState } from 'recoil';

const P01 = () => {
  const pageKey = 'p01';
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01SCP0101);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'listenAndSpeakENG',
    headerText: '단어 암기',
  };

  const initWordList = useMemo(() => {
    return cardData[pageKey].map(word => ({ ...word, path: `/L01/SP01-1/M1_L1_voca_${word.word}.mp3` }));
  }, [pageIds]);

  const handleChange = (index: number, status: boolean) => {
    setCardData(prev => ({
      ...prev,
      [pageKey]: prev[pageKey].map((item, idx) => (item.id === index ? { ...item, isMemorized: status } : item)),
    }));
  };

  return <HE01401 initWordList={initWordList} headerInfo={headerInfo} handleChange={handleChange} questionInfo={null} />;
};

export default P01;
