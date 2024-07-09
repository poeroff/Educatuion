import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01SP02 } from './store';
import { pageIdsAtom } from '@/stores/page';
import { useMemo } from 'react';
import HE01401 from '@maidt-cntn/pages/HE-014-01';

const P01 = () => {
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01SP02);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'listenAndSpeakENG',
    headerText: '단어 암기',
  };

  const questionInfo = null;

  const initWordList = useMemo(() => {
    return cardData.p01.initWordList?.map(word => ({ ...word, path: `/L01/SP01-1/M1_L1_voca_${word.word}.mp3` })) ?? [];
  }, [pageIds]);

  const handleChange = (index: number, status: boolean) => {
    setCardData(prev => ({
      ...prev,
      p01: {
        ...prev.p01,
        initWordList: prev.p01.initWordList?.map(item => (item.id === index ? { ...item, isMemorized: status } : item)) ?? [],
      },
    }));
  };

  return <HE01401 initWordList={initWordList} headerInfo={headerInfo} questionInfo={questionInfo} handleChange={handleChange} />;
};

export default P01;
