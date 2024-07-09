import { useMemo } from 'react';
import HE01401 from '@maidt-cntn/pages/HE-014-01';
import { pageIdsAtom } from '@/stores/page';
import { L03C05A04 } from './store';
import { useRecoilValue, useRecoilState } from 'recoil';
import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';

const P01 = () => {
  const pageKey = 'p01';
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C05A04);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Word List',
    headerPattern: 'text',
  };

  const questionInfo = {
    text: 'Check out the vocabulary from the reading text in advance.',
  };

  const initWordList = useMemo(() => {
    return cardData[pageKey].map(word => ({ ...word, path: `/L03/C05/A04/HE2-L03-C05-A04-${word.id.toString().padStart(2, '0')}.mp3` }));
  }, [pageIds]);

  const handleChange = (index: number, status: boolean) => {
    setCardData(prev => ({
      ...prev,
      [pageKey]: prev[pageKey].map((item, idx) => (item.id === index ? { ...item, isMemorized: status } : item)),
    }));
  };

  return <HE01401 headerInfo={headerInfo} questionInfo={questionInfo} initWordList={initWordList} handleChange={handleChange} />;
};

export default P01;
