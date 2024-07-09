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
    { audioSrc: '/L09/C04/A04/EE4-L09-C04-A04-P04-01.mp3' },
    { audioSrc: '/L09/C04/A04/EE4-L09-C04-A04-P04-02.mp3' },
    { audioSrc: '/L09/C04/A04/EE4-L09-C04-A04-P04-03.mp3' },
  ];

  const keyInfo = [0, 1, 2];
  const data: IListenAndAnswer[] = [
    { key: 0, type: 'G', question: 'Where is my ball?', answer: '내 공이 어디 있지?', color: '#E2F2FF' },
    { key: 0, type: 'B', question: 'It’s on the bed.', answer: '침대 위에 있어.', color: '#FFF0CC' },
    { key: 1, type: 'B', question: 'Where is my \nwatch?', answer: '내 손목시계가 어디 있지?', color: '#FFF0CC' },
    { key: 1, type: 'G', question: 'It’s under the chair.', answer: '의자 아래에 있어. ', color: '#E2F2FF' },
    { key: 2, type: 'G', question: 'Where is my brush?', answer: '내 붓이 어디 있지?', color: '#E2F2FF' },
    { key: 2, type: 'B1', question: 'I don’t know', answer: '잘 모르겠어.', color: '#FFF0CC' },
    { key: 2, type: 'B2', question: 'I don’t know', answer: '오, 바구니 안에 있어.', color: '#FFF0CC' },
  ];

  return <EEL02C04A04P02 headerInfo={headerInfo} questionInfo={questionInfo} audioList={audioList} data={data} keyInfo={keyInfo} />;
};

export default P04;
