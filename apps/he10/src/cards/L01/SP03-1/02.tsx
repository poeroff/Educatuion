import HE01501 from '@maidt-cntn/pages/HE-015-01';
import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { useMemo } from 'react';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 단어 연습',
    headerPattern: 'text',
  };

  const wordList = useMemo(
    () => [
      { id: 1, word: 'evolutionary', meaning: '진화의', meaningOrder: 6 },
      { id: 2, word: 'biologist', meaning: '생물학자', meaningOrder: 3 },
      { id: 3, word: 'locate', meaning: '~의 위치를 찾아내다', meaningOrder: 5 },
      { id: 4, word: 'fascinating', meaning: '흥미로운', meaningOrder: 1 },
      { id: 5, word: 'companion', meaning: '반려', meaningOrder: 7 },
      { id: 6, word: 'genetically', meaning: '유전적으로', meaningOrder: 8 },
      { id: 7, word: 'cooperate', meaning: '협력하다', meaningOrder: 10 },
      { id: 8, word: 'cooperative', meaning: '협력하는', meaningOrder: 2 },
      { id: 9, word: 'device', meaning: '장치', meaningOrder: 4 },
      { id: 10, word: 'occasionally', meaning: '가끔', meaningOrder: 9 },
    ],
    [],
  );
  const { dictionary, englishWordList, meaningList } = useMemo(() => {
    const dictionary = wordList.reduce((acc, cur) => {
      return { ...acc, [cur.word]: cur.meaning };
    }, {});
    const englishWordList = wordList.map(word => ({ word: word.word, isCorrect: false }));
    const meaningList = wordList
      .sort((a, b) => (a.meaningOrder ?? 0) - (b.meaningOrder ?? 0))
      .map(meaning => ({ meaning: meaning.meaning, isCorrect: false }));
    return { dictionary, englishWordList, meaningList };
  }, [wordList]);

  return <HE01501 headerInfo={headerInfo} dictionary={dictionary} wordList={englishWordList} meaningList={meaningList} />;
};

export default P02;
