// Page: EE4-L02-C04-A04-P02

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
    { audioSrc: '/L02/C01/A06/EE4-L02-C01-A06-P02-01.mp3' },
    { audioSrc: '/L02/C01/A06/EE4-L02-C01-A06-P02-02.mp3' },
    { audioSrc: '/L02/C01/A06/EE4-L02-C01-A06-P02-03.mp3' },
    { audioSrc: '/L02/C01/A06/EE4-L02-C01-A06-P02-04.mp3' },
  ];

  const keyInfo = [0, 1, 2, 3];

  const data: IListenAndAnswer[] = [
    { key: 0, type: 'G', question: 'This is my \nbrother.', answer: '이 사람은 우리 오\n빠/남동생이야.', color: '#E2F2FF' },
    { key: 1, type: 'G', question: 'This is my mom.', answer: '이분은 우리 엄마셔.', color: '#E2F2FF' },
    { key: 2, type: 'G', question: 'This is my dad.', answer: '이분은 우리 아빠셔.', color: '#E2F2FF' },
    { key: 3, type: 'G', question: 'This is my \nsister.', answer: '이 사람은 우리 언\n니/여동생이야.', color: '#E2F2FF' },
  ];

  return <EEL02C04A04P02 headerInfo={headerInfo} questionInfo={questionInfo} audioList={audioList} data={data} keyInfo={keyInfo} />;
};

export default P02;
