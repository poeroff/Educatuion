// Page: EE4-L02-C04-A04-P02

import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { useEffect, useState } from 'react';
import getFileList from '@/utils/getFileList';
import EEL02C04A04P02 from '@/Pages/EEL02C04A04P02';
import { IListenAndAnswer } from '@/Pages/EEL02C04A04P02';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Review 1',
  };

  const questionInfo: IQuestionProps = {
    text: '앞에서 들은 대화를 다시 한번 들어 봅시다.',
  };

  const audioList = [
    { audioSrc: '/L02/C04/A04/EE4-L02-C04-A04-P02-01.mp3' },
    { audioSrc: '/L02/C04/A04/EE4-L02-C04-A04-P02-02.mp3' },
    { audioSrc: '/L02/C04/A04/EE4-L02-C04-A04-P02-03.mp3' },
    { audioSrc: '/L02/C04/A04/EE4-L02-C04-A04-P02-04.mp3' },
  ];

  const keyInfo = [0, 1, 2, 3];

  const data: IListenAndAnswer[] = [
    { key: 0, type: 'B', question: 'This is is my sister.', answer: '이 아이는 내 여동생\n이에요.', color: '#E2F2FF' },
    { key: 0, type: 'W', question: 'Nice to meet you.', answer: '만나서 반가워.', color: '#FFF0CC' },
    { key: 0, type: 'G', question: 'Nice to meet you, \n too.', answer: '만나서 반가워요.', color: '#E2F2FF' },
    { key: 1, type: 'M', question: 'What’s your name?', answer: '너의 이름은 무엇이니?', color: '#FFF0CC' },
    { key: 1, type: 'G', question: 'My name is Yunha.', answer: '내 이름은 윤하예요.', color: '#E2F2FF' },
    { key: 2, type: 'M', question: 'Hi, what’s your \n  name?', answer: '안녕, 너의 이름은 \n 무엇이니?', color: '#FFF0CC' },
    { key: 2, type: 'B', question: 'My name is Minsu.', answer: '내 이름은 민수예요.', color: '#E2F2FF' },
    { key: 3, type: 'G', question: 'Jiho, this is is my \n dad.', answer: '지호, 이분은 나의 \n 아빠야.', color: '#E2F2FF' },
    { key: 3, type: 'B', question: 'Hello, nice to meet \n you.', answer: '안녕하세요, 만나서 \n 반가워요.', color: '#FFF0CC' },
    { key: 3, type: 'M', question: 'Nice to meet you, \n too.', answer: '만나서 반가워.', color: '#E2F2FF' },
  ];

  return <EEL02C04A04P02 headerInfo={headerInfo} questionInfo={questionInfo} audioList={audioList} data={data} keyInfo={keyInfo} />;
};

export default P02;
