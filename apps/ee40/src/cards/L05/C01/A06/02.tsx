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
    { audioSrc: '/L05/C01/A06/EE4-L05-C01-A06-P01.mp3' },
    { audioSrc: '/L05/C01/A06/EE4-L05-C01-A06-P02.mp3' },
    { audioSrc: '/L05/C01/A06/EE4-L05-C01-A06-P03.mp3' },
  ];

  const keyInfo = [0, 1, 2];

  const data: IListenAndAnswer[] = [
    { key: 0, type: 'G', question: 'Let’s play \nbaseball.', answer: '우리 야구를 하자.', color: '#E2F2FF' },
    { key: 0, type: 'B', question: 'Sure.', answer: '좋아.', color: '#FFF0CC' },
    { key: 1, type: 'B', question: 'Let’s play \nbadminton.', answer: '우리 배드민턴을 하자.', color: '#FFF0CC' },
    { key: 1, type: 'G', question: 'Sorry, I can’t.', answer: '미안해, 나는 할 수 \n없어.', color: '#E2F2FF' },
    { key: 2, type: 'G', question: 'Let’s play \nbasketball.', answer: '우리 농구를 하자.', color: '#E2F2FF' },
    { key: 2, type: 'B', question: 'Sorry, I can’t.', answer: '미안해, 나는 할 수 \n없어.', color: '#FFF0CC' },
  ];

  return <EEL02C04A04P02 headerInfo={headerInfo} questionInfo={questionInfo} audioList={audioList} data={data} keyInfo={keyInfo} />;
};

export default P02;
