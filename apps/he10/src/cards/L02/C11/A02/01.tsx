import { TMainHeaderInfoTypes, IAudioPlayerProps, IQuestionProps, TMarkType } from '@maidt-cntn/ui';
import { useState } from 'react';
import HE00401, { IApiInfo, IHE00401Data } from '@maidt-cntn/pages/HE-004-01';
import usePageData from '@/hooks/usePageData';
import { useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);

  const apiInfo: IApiInfo = {
    pageId: 'P01',
    changeData,
    initData,
    submitDataWithResult,
    saveData,
    pageIds,
    userId,
  };

  const [mark, setMark] = useState<TMarkType>('none');
  const ANSWER = 1;

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'A. Listening',
  };

  const questionInfo: IQuestionProps = {
    text: '1. What kind of books are the speakers talking about?',
    mark: mark,
  };

  const handleChangeMark = (selectedIdx: number | null) => {
    setMark(selectedIdx === ANSWER - 1 ? 'correct' : 'incorrect');
  };

  const data: IHE00401Data[] = [
    {
      text: 'sci-fi novels',
    },
    {
      text: 'comic books',
    },
    {
      text: 'detective novels',
    },
    {
      text: 'historical fiction books',
    },
  ];

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C11/A02/HE1-L02-C11-A02.mp3',
    captionSrc: '/L02/C11/A02/HE1-L02-C11-A02.srt',
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

export default P01;
