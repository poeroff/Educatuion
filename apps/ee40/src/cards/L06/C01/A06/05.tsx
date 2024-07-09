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
    { audioSrc: '/L06/C01/A06/EE4-L06-C01-A06-P01.mp3' },
    { audioSrc: '/L06/C01/A06/EE4-L06-C01-A06-P02.mp3' },
    { audioSrc: '/L06/C01/A06/EE4-L06-C01-A06-P03.mp3' },
    { audioSrc: '/L06/C01/A06/EE4-L06-C01-A06-P04.mp3' },
  ];

  const keyInfo = [0, 1, 2, 3];

  const data: IListenAndAnswer[] = [
    { key: 0, type: 'B', question: 'What are you \ndoing?', answer: '무엇을 하고 있니?', color: '#FFF0CC' },
    { key: 0, type: 'G', question: 'I’m cooking.', answer: '나는 요리하고 있어.', color: '#E2F2FF' },
    { key: 1, type: 'G', question: 'What are you \ndoing?', answer: '무엇을 하고 있니?', color: '#E2F2FF' },
    { key: 1, type: 'B', question: 'I’m listening to music.', answer: '나는 음악을 듣고 있어.', color: '#FFF0CC' },
    { key: 2, type: 'B', question: 'What are you \ndoing?', answer: '무엇을 하고 있니?', color: '#FFF0CC' },
    { key: 2, type: 'G', question: 'I’m reading a book.', answer: '나는 책을 읽고 있어.', color: '#E2F2FF' },
    { key: 3, type: 'G', question: 'What are you \ndoing?', answer: '무엇을 하고 있니?', color: '#E2F2FF' },
    { key: 3, type: 'B', question: 'I’m drawing a picture.', answer: '나는 그림을 그리고 있어.', color: '#FFF0CC' },
  ];

  return <EEL02C04A04P02 headerInfo={headerInfo} questionInfo={questionInfo} audioList={audioList} data={data} keyInfo={keyInfo} />;
};

export default P05;
