import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { useEffect, useState } from 'react';
import getFileList from '@/utils/getFileList';
import EEL02C04A04P02 from '@/Pages/EEL02C04A04P02';
import { IListenAndAnswer } from '@/Pages/EEL02C04A04P02';

const P04 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Do',
  };

  const questionInfo: IQuestionProps = {
    text: '앞에서 들은 대화를 다시 한번 들어 봅시다.',
  };

  const audioList = [
    { audioSrc: '/L03/C01/A06/EE4-L03-C01-A06-P01.mp3' },
    { audioSrc: '/L03/C01/A06/EE4-L03-C01-A06-P02.mp3' },
    { audioSrc: '/L03/C01/A06/EE4-L03-C01-A06-P03.mp3' },
  ];

  const keyInfo = [0, 1, 2];

  const data: IListenAndAnswer[] = [
    { key: 0, type: 'G', question: 'Who is she?', answer: '그녀는 누구야?', color: '#E2F2FF' },
    { key: 0, type: 'B', question: 'She’s my \ngrandma.', answer: '그녀는 나의 할머\n니야.', color: '#FFF0CC' },
    { key: 1, type: 'B', question: 'Who is he?', answer: '그는 누구야?', color: '#FFF0CC' },
    { key: 1, type: 'G', question: 'He’s my \ngrandpa.', answer: '그는 나의 할아버\n지야.', color: '#E2F2FF' },
    { key: 2, type: 'G', question: 'Who is she?', answer: '그녀는 누구야?', color: '#E2F2FF' },
    { key: 2, type: 'B', question: 'She’s my \nteacher.', answer: '그녀는 나의 선생\n님이야.', color: '#FFF0CC' },
  ];

  return <EEL02C04A04P02 headerInfo={headerInfo} questionInfo={questionInfo} audioList={audioList} data={data} keyInfo={keyInfo} />;
};

export default P04;
