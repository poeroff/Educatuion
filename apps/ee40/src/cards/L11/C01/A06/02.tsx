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
    { audioSrc: '/L11/C01/A06/EE4-L11-C01-A06-P02-01.mp3' },
    { audioSrc: '/L11/C01/A06/EE4-L11-C01-A06-P02-02.mp3' },
    { audioSrc: '/L11/C01/A06/EE4-L11-C01-A06-P02-03.mp3' },
    { audioSrc: '/L11/C01/A06/EE4-L11-C01-A06-P02-04.mp3' },
  ];

  const keyInfo = [0, 1, 2, 3];

  const data: IListenAndAnswer[] = [
    { key: 0, type: 'G', question: 'What day is it \ntoday?', answer: '오늘 무슨 요일이니?', color: '#E2F2FF' },
    { key: 0, type: 'B', question: 'It’s Tuesday.', answer: '화요일이야.', color: '#FFF0CC' },
    { key: 1, type: 'B', question: 'What day is it \ntoday?', answer: '오늘 무슨 요일이니?', color: '#FFF0CC' },
    { key: 1, type: 'G', question: 'It’s Thursday.', answer: '목요일이야.', color: '#E2F2FF' },
    { key: 2, type: 'G', question: 'What day is it \ntoday?', answer: '오늘 무슨 요일이니?', color: '#E2F2FF' },
    { key: 2, type: 'B', question: 'It’s Friday.', answer: '금요일이야.', color: '#FFF0CC' },
    { key: 3, type: 'B', question: 'What day is it \ntoday?', answer: '오늘 무슨 요일이니?', color: '#FFF0CC' },
    { key: 3, type: 'G', question: 'It’s Wednesday.', answer: '수요일이야.', color: '#E2F2FF' },
  ];

  return <EEL02C04A04P02 headerInfo={headerInfo} questionInfo={questionInfo} audioList={audioList} data={data} keyInfo={keyInfo} />;
};

export default P02;
