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
    { audioSrc: '/L04/C01/A06/EE4-L04-C01-A06-P02-01.mp3' },
    { audioSrc: '/L04/C01/A06/EE4-L04-C01-A06-P02-02.mp3' },
    { audioSrc: '/L04/C01/A06/EE4-L04-C01-A06-P02-03.mp3' },
    { audioSrc: '/L04/C01/A06/EE4-L04-C01-A06-P02-04.mp3' },
  ];

  const keyInfo = [0, 1, 2, 3];

  const data: IListenAndAnswer[] = [
    { key: 0, type: 'W', question: 'Don’t run, \nplease.', answer: '달리지 말아 줘.', color: '#E2F2FF' },
    { key: 1, type: 'M', question: 'Don’t talk, \nplease.', answer: '말하지 말아 줘.', color: '#FFF0CC' },
    { key: 2, type: 'W', question: 'Don’t eat, \nplease.', answer: '먹지 말아 줘.', color: '#E2F2FF' },
    { key: 3, type: 'M', question: 'Don’t enter, \nplease.', answer: '들어가지 말아 줘.', color: '#FFF0CC' },
  ];

  return <EEL02C04A04P02 headerInfo={headerInfo} questionInfo={questionInfo} audioList={audioList} data={data} keyInfo={keyInfo} />;
};

export default P02;
