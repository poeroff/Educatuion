import { useMemo } from 'react';
import HE01401 from '@maidt-cntn/pages/HE-014-01';
import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 단어 암기',
    headerPattern: 'text',
  };
  const initWordList = useMemo(() => {
    const wordList = [
      { id: 1, word: 'evolutionary', meaning: '진화의' },
      { id: 2, word: 'biologist', meaning: '생물학자' },
      { id: 3, word: 'locate', meaning: '~의 위치를 찾아내다' },
      { id: 4, word: 'fascinating', meaning: '흥미로운' },
      { id: 5, word: 'companion', meaning: '반려' },
      { id: 6, word: 'responsive', meaning: '반응하는' },
      { id: 7, word: 'behavior', meaning: '행동' },
      { id: 8, word: 'anthropologist', meaning: '인류학자' },
      { id: 9, word: 'conduct', meaning: '수행하다' },
      { id: 10, word: 'ancestor', meaning: '조상' },
      { id: 11, word: 'at random', meaning: '무작위로' },
      { id: 12, word: 'conclude', meaning: '결론짓다' },
      { id: 13, word: 'species', meaning: '종' },
      { id: 14, word: 'evolve', meaning: '진화하다' },
      { id: 15, word: 'colleague', meaning: '동료' },
      { id: 16, word: 'genetically', meaning: '유전적으로' },
      { id: 17, word: 'cooperate', meaning: '협력하다' },
      { id: 18, word: 'cooperative', meaning: '협력하는' },
      { id: 19, word: 'device', meaning: '장치' },
      { id: 20, word: 'occasionally', meaning: '가끔' },
      { id: 21, word: 'get along', meaning: '어울리다' },
      { id: 22, word: 'extinction', meaning: '멸종' },
      { id: 23, word: 'superior', meaning: '우세한' },
      { id: 24, word: 'attribute', meaning: '특성' },
      { id: 25, word: 'ultimately', meaning: '궁극적으로' },
      { id: 26, word: 'thrive', meaning: '번성하다' },
      { id: 27, word: 'competitive', meaning: '경쟁력 있는' },
      { id: 28, word: 'alternative', meaning: '대안의' },
      { id: 29, word: 'bouquet', meaning: '꽃다발' },
      { id: 30, word: 'harmonize', meaning: '조화를 이루다' },
    ];
    return wordList.map(word => ({ ...word, path: `/L01/SP03-1/HE1-L01-SP03-1_voca_${word.word.toString().padStart(2, '0')}.wav` }));
  }, []);

  return <HE01401 headerInfo={headerInfo} questionInfo={{}} initWordList={initWordList} />;
};

export default P01;
