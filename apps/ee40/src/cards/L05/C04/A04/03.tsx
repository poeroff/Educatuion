import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { useEffect, useState } from 'react';
import getFileList from '@/utils/getFileList';
import EEL02C04A04P02 from '@/Pages/EEL02C04A04P02';
import { IListenAndAnswer } from '@/Pages/EEL02C04A04P02';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Review 1',
  };

  const questionInfo: IQuestionProps = {
    text: '앞에서 들은 대화를 다시 한번 들어 봅시다.',
  };

  const keyInfo = [0, 1];
  const audioList = [{ audioSrc: '/L05/C04/A04/EE4-L05-C04-A04-P03-01.mp3' }, { audioSrc: '/L05/C04/A04/EE4-L05-C04-A04-P03-02.mp3' }];

  const data: IListenAndAnswer[] = [
    { key: 0, type: 'B', question: 'Let’s play basketball.', answer: '우리 농구하자.', color: '#E2F2FF' },
    { key: 0, type: 'G', question: '____________', answer: '', color: '#FFF0CC' },
    { key: 0, type: 'a', question: 'Sure.', answer: '물론이지.', color: '#EFF0F2' },
    { key: 0, type: 'b', question: `Sorry, I can't`, answer: '미안해, 나는 할 수 없어.', color: '#EFF0F2' },

    { key: 1, type: 'G', question: 'Let’s play badminton.', answer: '우리 배드민턴 치자.', color: '#FFF0CC' },

    { key: 1, type: 'B', question: '____________', answer: '', color: '#E2F2FF' },

    { key: 1, type: 'a', question: 'Sorry, I can’t.\n I’m sick.', answer: '미안해, 나는 할 수 없어. 나는 아파.', color: '#EFF0F2' },

    { key: 1, type: 'b', question: 'Sorry, I can’t.\n I’m busy.', answer: '미안해, 나는 할 수 없어. 나는 바빠.', color: '#EFF0F2' },
  ];

  return <EEL02C04A04P02 headerInfo={headerInfo} questionInfo={questionInfo} audioList={audioList} data={data} keyInfo={keyInfo} />;
};

export default P03;
