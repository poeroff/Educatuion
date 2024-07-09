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
    { audioSrc: '/L09/C01/A06/EE4-L09-C01-A06-P01.mp3' },
    { audioSrc: '/L09/C01/A06/EE4-L09-C01-A06-P02.mp3' },
    { audioSrc: '/L09/C01/A06/EE4-L09-C01-A06-P03.mp3' },
  ];

  const keyInfo = [0, 1, 2];

  const data: IListenAndAnswer[] = [
    { key: 0, type: 'B', question: 'Where is my \nball?', answer: '내 공이 어디있지?', color: '#FFF0CC' },
    { key: 0, type: 'G', question: 'It’s on the desk.', answer: '책상 위에 있어.', color: '#E2F2FF' },
    { key: 1, type: 'G', question: 'Where is my \nhat?', answer: '내 모자가 어디있지?', color: '#E2F2FF' },
    { key: 1, type: 'B', question: 'It’s under the \nchair.', answer: '의자 아래에 있어.', color: '#FFF0CC' },
    { key: 2, type: 'B', question: 'Where is my \nbag?', answer: '내 가방이 어디있지?', color: '#FFF0CC' },
    { key: 2, type: 'G', question: 'It’s in the box.', answer: '상자 안에 있어.', color: '#E2F2FF' },
  ];

  return <EEL02C04A04P02 headerInfo={headerInfo} questionInfo={questionInfo} audioList={audioList} data={data} keyInfo={keyInfo} />;
};

export default P04;
