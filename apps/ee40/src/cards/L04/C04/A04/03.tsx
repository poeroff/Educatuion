// Page: EE4-L04-C04-A04-P03

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

  const audioList = [{ audioSrc: '/L04/C04/A04/EE4-L04-C04-A04-P03-01.mp3' }, { audioSrc: '/L04/C04/A04/EE4-L04-C04-A04-P03-02.mp3' }];

  const keyInfo = [0, 1];

  const data: IListenAndAnswer[] = [
    { key: 0, type: 'W', question: 'Put on this helmet, \n please.', answer: '이 헬멧을 써라.', color: '#E2F2FF' },
    { key: 0, type: 'B', question: 'Okay.', answer: '알겠어요.', color: '#FFF0CC' },
    { key: 1, type: 'M', question: 'Don’t talk, \n please.', answer: '말하지 마세요.', color: '#FFF0CC' },
    { key: 1, type: 'G', question: 'Oh, I’m sorry.', answer: '오, 미안해요.', color: '#E2F2FF' },
  ];

  return <EEL02C04A04P02 headerInfo={headerInfo} questionInfo={questionInfo} audioList={audioList} data={data} keyInfo={keyInfo} />;
};

export default P03;
