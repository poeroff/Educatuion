import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import HE00401, { IApiInfo } from '@maidt-cntn/pages/HE-004-01';
import { TMainHeaderInfoTypes, IAudioPlayerProps, IQuestionProps, TMarkType } from '@maidt-cntn/ui';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

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

  const answer = 1;
  const [mark, setMark] = useState<TMarkType>('none');

  const handleChangeMark = (selectedIdx: number | null) => {
    setMark(selectedIdx !== undefined ? (selectedIdx === answer - 1 ? 'correct' : 'incorrect') : 'none');
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo: IQuestionProps = {
    text: 'Which can be answered with information from the dialogue?',
    mark: mark,
  };

  const data = [
    {
      text: 'How did the self-cleaning system in the house work?',
    },
    {
      text: 'Why did Frances Gabe invent the self-cleaning house?',
    },
    {
      text: 'How long did Frances Gabe live in the self-cleaning house?',
    },
  ];

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C03/A02/HE1-L03-C03-A02-01.mp3',
    captionSrc: '/L03/C03/A02/HE1-L03-C03-A02-01.srt',
  };

  return (
    <HE00401
      apiInfo={apiInfo}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      answer={answer}
      changeMark={handleChangeMark}
      data={data}
    />
  );
};

export default P01;
