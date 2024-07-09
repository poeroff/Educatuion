import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { useEffect, useState } from 'react';
import getFileList from '@/utils/getFileList';
import EEL03C04A04P04 from '@/Pages/EEL03C04A04P04';
import { IListenAndAnswer } from '@/Pages/EEL03C04A04P04';

const P04 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Review 1',
  };

  const questionInfo: IQuestionProps = {
    text: '앞에서 들은 대화를 다시 한번 들어 봅시다.',
  };

  const audioList = [
    { audioSrc: '/L10/C04/A04/EE4-L10-C04-A04-P04-01.mp3' },
    { audioSrc: '/L10/C04/A04/EE4-L10-C04-A04-P04-02.mp3' },
    { audioSrc: '/L10/C04/A04/EE4-L10-C04-A04-P04-03.mp3' },
  ];

  const data: IListenAndAnswer[] = [
    { key: 0, type: 'B', question: 'Is this your coat?', answer: '이게 네 코트니?', color: '#FFF0CC' },
    { key: 0, type: 'G', question: 'Yes, it is.', answer: '응, 맞아.', color: '#E2F2FF' },
    { key: 1, type: 'G', question: 'Is this your scarf?', answer: '이것이 너의 스카프니?', color: '#E2F2FF' },
    { key: 1, type: 'B', question: 'No, it isn’t. \nMy scarf is long.', answer: '아니, 그렇지 않아.\n 내 스카프는 길어.', color: '#FFF0CC' },
    { key: 2, type: 'B', question: 'Is this your cap?', answer: '이게 네 모자니?', color: '#FFF0CC' },
    { key: 2, type: 'G', question: 'No, it isn’t. My cap is blue.', answer: '아니, 그렇지 않아.내 모자는 파란색이야.', color: '#E2F2FF' },
  ];

  return <EEL03C04A04P04 headerInfo={headerInfo} questionInfo={questionInfo} audioList={audioList} data={data} />;
};

export default P04;
