import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData } from './pageData';

import EE4L05C03A07bP01, { IListenAndAnswer, IPageInfo } from '@/Pages/EE4L05C03A06bP01';
const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Words and Sentences 3',
  };

  const questionInfo: IQuestionProps = {
    text: '다음 문장을 듣고 따라 읽어 봅시다.',
  };

  const pageInfo: IPageInfo = {
    pageNum: 1,
    mainKey: 1,
    subKey: ['RECORDER-01', 'RECORDER-02', 'RECORDER-03', 'RECORDER-04'],
  };

  const data: IListenAndAnswer[] = [
    {
      content: "Let's play baseball",
      audioSrc: '/L05/C03/A07b/EE4-L05-C03-A07b-P01-01.mp3',
    },
    {
      content: "Let's play badminton",
      audioSrc: '/L05/C03/A07b/EE4-L05-C03-A07b-P01-02.mp3',
    },
    {
      content: "Let's play basketball",
      audioSrc: '/L05/C03/A07b/EE4-L05-C03-A07b-P01-03.mp3',
    },
    {
      content: "Let's play soccer",
      audioSrc: '/L05/C03/A07b/EE4-L05-C03-A07b-P01-04.mp3',
    },
  ];

  return (
    <EE4L05C03A07bP01
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      data={data}
      pageInfo={pageInfo}
      getCorrectData={getCorrectData}
      getDefaultData={getDefaultData}
    />
  );
};

export default P01;
