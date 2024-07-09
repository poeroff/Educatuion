import { useMemo } from 'react';
import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import HE01401 from '@maidt-cntn/pages/HE-014-01';
import { L01SP03_1 } from './store';
import { useRecoilState } from 'recoil';

const P01 = () => {
  const pageKey = 'p01';
  const [cardData, setCardData] = useRecoilState(L01SP03_1);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'readENG',
    headerText: '단어 암기',
  };

  const initWordList = useMemo(() => {
    return cardData[pageKey].map(word => ({ ...word, path: `/L01/SP03-1/M1_L1_voca_${word.word.split(' ').join('_')}.mp3` }));
  }, []);

  const handleChange = (index: number, status: boolean) => {
    setCardData(prev => ({
      ...prev,
      [pageKey]: prev[pageKey].map((item, idx) => (item.id === index ? { ...item, isMemorized: status } : item)),
    }));
  };

  return <HE01401 headerInfo={headerInfo} questionInfo={null} initWordList={initWordList} handleChange={handleChange} />;
};

export default P01;
