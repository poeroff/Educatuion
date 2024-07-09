import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { useEffect, useState } from 'react';
import getFileList from '@/utils/getFileList';
import EEL03C04A04P04 from '@/Pages/EEL03C04A04P04';
import { IListenAndAnswer } from '@/Pages/EEL03C04A04P04';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Review 1',
  };

  const questionInfo: IQuestionProps = {
    text: '앞에서 들은 대화를 다시 한번 들어 봅시다.',
  };

  const audioList = [
    { audioSrc: '/L07/C04/A04/EE4-L07-C04-A04-P02-01.mp3' },
    { audioSrc: '/L07/C04/A04/EE4-L07-C04-A04-P02-02.mp3' },
    { audioSrc: '/L07/C04/A04/EE4-L07-C04-A04-P02-03.mp3' },
  ];

  const data: IListenAndAnswer[] = [
    { key: 0, type: 'B', question: 'What time is it?', answer: '몇 시니?', color: '#E2F2FF' },
    { key: 0, type: 'G', question: 'It’s 12 o’clock\nIt’s time for \nlunch', answer: '12시야. 점심 식사\n할 시간이야.', color: '#FFF0CC' },
    { key: 1, type: 'G', question: 'What time is it?', answer: '몇 시니?', color: '#FFF0CC' },
    { key: 1, type: 'B', question: 'It’s 8 o’clock\nIt’s time for \nschool.', answer: '8시야. 학교 갈 시\n간이야. ', color: '#E2F2FF' },
    { key: 2, type: 'B', question: 'What time is it?', answer: '몇 시니?', color: '#E2F2FF' },
    { key: 2, type: 'G', question: '  It’s 9 o’clock. \nIt’s time for bed.', answer: '9시야. 자야 할 시간이야.', color: '#FFF0CC' },
  ];

  return <EEL03C04A04P04 headerInfo={headerInfo} questionInfo={questionInfo} audioList={audioList} data={data} />;
};

export default P02;
