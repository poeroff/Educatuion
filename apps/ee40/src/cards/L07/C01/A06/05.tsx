import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { useEffect, useState } from 'react';
import getFileList from '@/utils/getFileList';
import EEL02C04A04P02 from '@/Pages/EEL02C04A04P02';
import { IListenAndAnswer } from '@/Pages/EEL02C04A04P02';

const P05 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Do',
  };

  const questionInfo: IQuestionProps = {
    text: '앞에서 들은 대화를 다시 한번 들어 봅시다.',
  };

  const audioList = [
    { audioSrc: '/L07/C01/A06/EE4-L07-C01-A06-P01.mp3' },
    { audioSrc: '/L07/C01/A06/EE4-L07-C01-A06-P02.mp3' },
    { audioSrc: '/L07/C01/A06/EE4-L07-C01-A06-P03.mp3' },
    { audioSrc: '/L07/C01/A06/EE4-L07-C01-A06-P04.mp3' },
  ];

  const keyInfo = [0, 1, 2, 3];

  const data: IListenAndAnswer[] = [
    { key: 0, type: 'B', question: 'What time is it?', answer: '지금 몇 시니?', color: '#FFF0CC' },
    { key: 0, type: 'G', question: 'It’s 7 o’clock.', answer: '7시야.', color: '#E2F2FF' },
    { key: 1, type: 'G', question: 'What time is it?', answer: '지금 몇 시니?', color: '#E2F2FF' },
    { key: 1, type: 'B', question: 'It’s 12 o’clock.', answer: '12시야.', color: '#FFF0CC' },
    { key: 2, type: 'B', question: 'What time is it?', answer: '지금 몇 시니?', color: '#FFF0CC' },
    { key: 2, type: 'G', question: 'It’s 3:30.', answer: '3시 30분이야.', color: '#E2F2FF' },
    { key: 3, type: 'G', question: 'What time is it?', answer: '지금 몇 시니?', color: '#E2F2FF' },
    { key: 3, type: 'B', question: 'It’s 10:30.', answer: '10시 30분이야.', color: '#FFF0CC' },
  ];

  return <EEL02C04A04P02 headerInfo={headerInfo} questionInfo={questionInfo} audioList={audioList} data={data} keyInfo={keyInfo} />;
};

export default P05;
