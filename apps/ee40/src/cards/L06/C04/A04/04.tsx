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
    { audioSrc: '/L06/C04/A04/EE4-L06-C04-A04-P04-01.mp3' },
    { audioSrc: '/L06/C04/A04/EE4-L06-C04-A04-P04-02.mp3' },
    { audioSrc: '/L06/C04/A04/EE4-L06-C04-A04-P04-03.mp3' },
  ];

  const data: IListenAndAnswer[] = [
    { key: 0, type: 'B', question: 'What are you \ndoing?', answer: '무엇을 하는 중이니?', color: '#E2F2FF' },
    { key: 0, type: 'G', question: 'I’m cleaning.', answer: '나는 청소하는 중이야.', color: '#FFF0CC' },
    { key: 1, type: 'G', question: 'What is she \ndoing?', answer: '그녀는 무엇을 하는 중이니?', color: '#FFF0CC' },
    { key: 1, type: 'B', question: 'She’s making a robot.', answer: '그녀는 로봇을 만드는 중이야. ', color: '#E2F2FF' },
    { key: 2, type: 'B', question: '  What is he \ndoing?', answer: '그는 무엇을 하는 중이니?', color: '#E2F2FF' },
    { key: 2, type: 'G', question: 'He’s drawing a picture.', answer: '그는 그림을 그리는 중이야.', color: '#FFF0CC' },
  ];

  return <EEL03C04A04P04 headerInfo={headerInfo} questionInfo={questionInfo} audioList={audioList} data={data} />;
};

export default P04;
