import { TMainHeaderInfoTypes, IAudioPlayerProps, IQuestionProps } from '@maidt-cntn/ui';
import { useState } from 'react';
import HE00401, { IApiInfo } from '@maidt-cntn/pages/HE-004-01';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilValue } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { studentAtom } from '@/stores/student';

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);

  const apiInfo: IApiInfo = {
    pageId: 'P03',
    changeData,
    initData,
    submitDataWithResult,
    saveData,
    pageIds,
    userId,
  };

  const answer = 2;
  const [mark, setMark] = useState<string>('none');

  const questionInfo: IQuestionProps = {
    text: 'Which is NOT true according to the dialogue?',
    size: 'medium',
    markSize: 'middle',
    mark: mark,
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C03/A02/HE1-L01-C03-A02-02.mp3',
    captionSrc: '/L01/C03/A02/HE1-L01-C03-A02-02.srt',
  };

  const handleChangeMark = (selectedIdx: number | null) => {
    setMark(selectedIdx === answer - 1 ? 'correct' : 'incorrect');
  };

  const data = [
    {
      text: 'The boy won the dance competition.',
    },
    {
      text: 'The girl performed a dance at the school festival last year.',
    },
    {
      text: 'The speakers feel so thankful to their team members.',
    },
  ];

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

export default P03;
