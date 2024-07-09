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

  const audioList = [{ audioSrc: '/L11/C04/A04/EE4-L11-C04-A04-P03-01.mp3' }, { audioSrc: '/L11/C04/A04/EE4-L11-C04-A04-P03-02.mp3' }];

  const data: IListenAndAnswer[] = [
    { key: 0, type: 'G', question: 'What day is it today?', answer: '오늘 무슨 요일이니?', color: '#E2F2FF' },
    { key: 0, type: 'B', question: 'It’s Tuesday.\nI have dance class.', answer: '화요일이야. 나는 춤 수업이 있어.', color: '#FFF0CC' },

    { key: 1, type: 'B', question: 'What day is it today?', answer: '오늘 무슨 요일이니?', color: '#FFF0CC' },
    { key: 1, type: 'G', question: 'It’s Wednesday.\nI have reading class.', answer: '수요일이야. 나는 독서 수업이 있어.', color: '#E2F2FF' },
  ];

  return <EEL05C04A04P03 headerInfo={headerInfo} questionInfo={questionInfo} audioList={audioList} data={data} />;
};

export default P03;
