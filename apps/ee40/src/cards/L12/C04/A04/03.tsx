import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { useEffect, useState } from 'react';
import getFileList from '@/utils/getFileList';
import EEL05C04A04P03 from '@/Pages/EEL05C04A04P03';
import { IListenAndAnswer } from '@/Pages/EEL05C04A04P03';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Review 1',
  };

  const questionInfo: IQuestionProps = {
    text: '앞에서 들은 대화를 다시 한번 들어 봅시다.',
  };

  const audioList = [{ audioSrc: '/L12/C04/A04/EE4-L12-C04-A04-P03-01.mp3' }, { audioSrc: '/L12/C04/A04/EE4-L12-C04-A04-P03-02.mp3' }];

  const data: IListenAndAnswer[] = [
    { key: 0, type: 'G', question: 'What do you do \non weekends?', answer: '너는 주말에 무엇을 하니?', color: '#E2F2FF' },
    { key: 0, type: 'B', question: 'I play the piano. \nHow about you?', answer: '나는 피아노를 쳐. 너는 어때?', color: '#FFF0CC' },
    { key: 0, type: 'G', question: 'I read books.', answer: '난 책을 읽어.', color: '#E2F2FF' },

    { key: 1, type: 'B', question: 'What do you do \non weekends?', answer: '너는 주말에 무엇을 하니?', color: '#FFF0CC' },
    { key: 1, type: 'G', question: 'I play soccer. \nHow about you?', answer: '나는 축구를 해. 너는 어때?', color: '#E2F2FF' },
    { key: 1, type: 'B', question: 'I watch movies.', answer: '나는 영화를 봐.', color: '#FFF0CC' },
  ];

  return <EEL05C04A04P03 headerInfo={headerInfo} questionInfo={questionInfo} audioList={audioList} data={data} />;
};

export default P03;
