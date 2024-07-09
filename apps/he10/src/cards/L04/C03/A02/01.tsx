import usePageData from '@/hooks/usePageData';
import HE00401, { IApiInfo } from '@maidt-cntn/pages/HE-004-01';
import { TMainHeaderInfoTypes, IAudioPlayerProps, IQuestionProps, TMarkType } from '@maidt-cntn/ui';
import { useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { useState } from 'react';

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

  const answer = 3;
  const [mark, setMark] = useState<TMarkType>('none');
  const data = [
    {
      text: 'buy new socks',
    },
    {
      text: 'take out the trash',
    },
    {
      text: 'make dolls from socks',
    },
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo: IQuestionProps = {
    text: 'What are the speakers most likely to do together after the dialogue?',
    mark: mark,
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C03/A02/HE1-L04-C03-A02-01.mp3',
    captionSrc: '/L04/C03/A02/HE1-L04-C03-A02-01.srt',
  };

  const handleChangeMark = (selectedIdx: number | null) => {
    setMark(selectedIdx !== undefined ? (selectedIdx === answer - 1 ? 'correct' : 'incorrect') : 'none');
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
