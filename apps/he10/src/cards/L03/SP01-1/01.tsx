import HE01401 from '@maidt-cntn/pages/HE-014-01';
import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L03SP011State } from './store';
import { pageIdsAtom } from '@/stores/page';

const P01 = () => {
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03SP011State);
  const pageKey = 'p01';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 단어 암기',
    headerPattern: 'text',
  };

  const initWordList = useMemo(() => {
    return cardData[pageKey].map(word => ({ ...word, path: `/L03/SP01-1/HE1-L03-SP01-1-voca_${word.pathFileNm ? word.pathFileNm : word.word}.mp3` }));
  }, [pageIds]);

  const handleChange = (index: number, status: boolean) => {
    setCardData(prev => ({
      ...prev,
      [pageKey]: prev[pageKey].map((item, idx) => (item.id === index ? { ...item, isMemorized: status } : item)),
    }));
  };

  return <HE01401 initWordList={initWordList} headerInfo={headerInfo} handleChange={handleChange} questionInfo={{}} />;
};

export default P01;
