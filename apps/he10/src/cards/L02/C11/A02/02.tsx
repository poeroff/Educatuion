import { TMainHeaderInfoTypes, IAudioPlayerProps, IQuestionProps, TMarkType } from '@maidt-cntn/ui';
import { useState } from 'react';
import HE00401, { IApiInfo, IHE00401Data } from '@maidt-cntn/pages/HE-004-01';
import usePageData from '@/hooks/usePageData';
import { useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [mark, setMark] = useState<TMarkType>('none');
  const ANSWER = 1;

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'A. Listening',
  };

  const questionInfo: IQuestionProps = {
    text: '2. Listen again. What is the girl most likely to do for the boy?',
    markSize: 'middle',
    mark: mark,
  };

  const handleChangeMark = (selectedIdx: number | null) => {
    setMark(selectedIdx === ANSWER - 1 ? 'correct' : 'incorrect');
  };

  const data: IHE00401Data[] = [
    {
      text: 'visit the bookstore with him',
    },
    {
      text: 'help him with his book review',
    },
    {
      text: 'give him the book she is reading',
    },
    {
      text: 'bring him the books she enjoyed',
    },
  ];

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C11/A02/HE1-L02-C11-A02.mp3',
    captionSrc: '/L02/C11/A02/HE1-L02-C11-A02.srt',
  };

  const apiInfo: IApiInfo = {
    pageId: 'P02',
    changeData,
    initData,
    submitDataWithResult,
    saveData,
    pageIds,
    userId,
  };

  return (
    <HE00401
      apiInfo={apiInfo}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      data={data}
      answer={ANSWER}
      changeMark={handleChangeMark}
    />
  );
};

export default P02;
