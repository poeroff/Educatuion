import { TMainHeaderInfoTypes, IAudioPlayerProps, IQuestionProps } from '@maidt-cntn/ui';
import { useState } from 'react';
import HE00401, { IApiInfo } from '@maidt-cntn/pages/HE-004-01';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilValue } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { studentAtom } from '@/stores/student';
interface IProps {
  headerInfo: TMainHeaderInfoTypes;
  audioInfo: IAudioPlayerProps;
}
const P01 = ({ headerInfo, audioInfo }: IProps) => {
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

  const answer = 2;
  const [mark, setMark] = useState<string>();

  const questionInfo: IQuestionProps = {
    text: 'What are the speakers going to do together this weekend?',
    size: 'medium',
    mark: mark,
  };

  const handleChangeMark = (selectedIdx: number | null) => {
    setMark(selectedIdx === answer - 1 ? 'correct' : 'incorrect');
  };

  const data = [
    {
      text: 'They plan to cook at a nursing home.​',
    },
    {
      text: 'They are going to sing for the elderly.',
    },
    {
      text: 'They are going to volunteer for a singing contest.',
    },
    {
      text: 'They are planning to invite the elderly residents to their house.',
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

export default P01;
