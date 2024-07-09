import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { useEffect, useState } from 'react';
import getFileList from '@/utils/getFileList';
import EEL02C04A04P02 from '@/Pages/EEL02C04A04P02';
import { IListenAndAnswer } from '@/Pages/EEL02C04A04P02';

const P04 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Review 1',
  };

  const questionInfo: IQuestionProps = {
    text: '앞에서 들은 대화를 다시 한번 들어 봅시다.',
  };

  const audioList = [
    { audioSrc: '/L03/C04/A04/EE4-L03-C04-A04-P04-01.mp3' },
    { audioSrc: '/L03/C04/A04/EE4-L03-C04-A04-P04-02.mp3' },
    { audioSrc: '/L03/C04/A04/EE4-L03-C04-A04-P04-03.mp3' },
  ];

  const keyInfo = [0, 1, 2];
  const data: IListenAndAnswer[] = [
    { key: 0, type: 'B', question: 'She’s cute. Who \nis she?', answer: '그녀는 귀엽다. 이 \n여자분은 누구야?', color: '#E2F2FF' },
    { key: 0, type: 'G', question: 'She’s my friend.', answer: '그녀는 내 친구야.', color: '#FFF0CC' },
    { key: 1, type: 'G', question: 'Who is she?', answer: '이 여자분은 누구야?', color: '#FFF0CC' },
    { key: 1, type: 'B', question: 'She’s my grandma.\nShe’s cool.', answer: '그녀는 우리 할머니야. 그녀는 멋져. ', color: '#E2F2FF' },
    { key: 2, type: 'B', question: 'Who is he?', answer: '그 남자분은 누구야?', color: '#E2F2FF' },
    { key: 2, type: 'G', question: 'He’s my teacher', answer: '그는 우리 선생님이야. ', color: '#FFF0CC' },
    { key: 2, type: 'B', question: 'He’s tall.', answer: '그는 키가 크다.', color: '#E2F2FF' },
  ];

  return <EEL02C04A04P02 headerInfo={headerInfo} questionInfo={questionInfo} audioList={audioList} data={data} keyInfo={keyInfo} />;
};

export default P04;
