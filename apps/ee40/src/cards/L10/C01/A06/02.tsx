import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { useEffect, useState } from 'react';
import getFileList from '@/utils/getFileList';
import EEL02C04A04P02 from '@/Pages/EEL02C04A04P02';
import { IListenAndAnswer } from '@/Pages/EEL02C04A04P02';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Do',
  };

  const questionInfo: IQuestionProps = {
    text: '앞에서 들은 대화를 다시 한번 들어 봅시다.',
  };

  const audioList = [
    { audioSrc: '/L10/C01/A06/EE4-L10-C01-A06-P02-01.mp3' },
    { audioSrc: '/L10/C01/A06/EE4-L10-C01-A06-P02-02.mp3' },
    { audioSrc: '/L10/C01/A06/EE4-L10-C01-A06-P02-03.mp3' },
  ];

  const keyInfo = [0, 1, 2];

  const data: IListenAndAnswer[] = [
    { key: 0, type: 'B', question: 'Is this your \nscarf?', answer: '이게 네 스카프니?', color: '#FFF0CC' },
    { key: 0, type: 'G', question: 'Yes, it is.', answer: '응, 맞아.', color: '#E2F2FF' },
    { key: 1, type: 'B', question: 'Is this your \ndress?', answer: '이게 네 드레스니?', color: '#FFF0CC' },
    { key: 1, type: 'G', question: 'No, it isn’t.', answer: '아니, 그렇지 않아.', color: '#E2F2FF' },
    { key: 2, type: 'B', question: ' Is this your \nshoe?', answer: '이게 네 신발이니?', color: '#FFF0CC' },
    { key: 2, type: 'G', question: 'Yes, it is.', answer: '응, 맞아.', color: '#E2F2FF' },
  ];

  return <EEL02C04A04P02 headerInfo={headerInfo} questionInfo={questionInfo} audioList={audioList} data={data} keyInfo={keyInfo} />;
};

export default P02;
