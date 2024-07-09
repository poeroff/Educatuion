import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import HE00401, { IApiInfo, IHE00401Data } from '@maidt-cntn/pages/HE-004-01';
import { IAudioPlayerProps, IQuestionProps, TMainHeaderInfoTypes, TMarkType } from '@maidt-cntn/ui';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);

  const apiInfo: IApiInfo = {
    pageId: 'P02',
    changeData,
    initData,
    submitDataWithResult,
    saveData,
    pageIds,
    userId,
  };

  const [mark, setMark] = useState<TMarkType>('none');
  const ANSWER = 2;

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'A. Listening',
  };

  const questionInfo: IQuestionProps = {
    text: '2. Listen again. Which is NOT mentioned in the dialogue?',
    markSize: 'middle',
    mark: mark,
  };

  const handleChangeMark = (selectedIdx: number | null) => {
    setMark(selectedIdx === ANSWER - 1 ? 'correct' : 'incorrect');
  };

  const data: IHE00401Data[] = [
    {
      text: 'The speakers are looking at a photo of a Jeju beach.',
    },
    {
      text: 'Water tends to absorb blue light more than other colors of light.',
    },
    {
      text: 'Sea plants and sand in the water are likely to reflect green light.',
    },
    {
      text: 'The girl wants to study more about the topic.',
    },
  ];

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C11/A02/HE1-L03-C11-A02.mp3',
    captionSrc: '/L03/C11/A02/HE1-L03-C11-A02.srt',
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
