import HE01401 from '@maidt-cntn/pages/HE-014-01';
import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { useCallback, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import L01SP011State from './store';

const P01 = () => {
  const [cardData, setCardData] = useRecoilState(L01SP011State);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 단어 암기',
    headerPattern: 'text',
  };

  const initWordList = useMemo(() => {
    return cardData.p01?.map(word => ({ ...word, path: `/L02/C05/A04/HE1-L02-C05-A04-${word.id.toString().padStart(2, '0')}.mp3` })) ?? [];
  }, []);

  const handleChange = useCallback((index: number, status: boolean) => {
    setCardData(prev => ({
      ...prev,
      p01: prev.p01?.map(item => (item.id === index ? { ...item, isMemorized: status } : item)),
    }));
  }, []);

  return <HE01401 initWordList={initWordList} headerInfo={headerInfo} questionInfo={{}} handleChange={handleChange} />;
};

export default P01;
