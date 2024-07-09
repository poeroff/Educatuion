import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData } from './pageData';

import { IPageInfo } from '@/Pages/EEL03C04A06P01';
import EE4L05C01A06aP01, { IListenAndAnswer } from '@/Pages/EE4L05C01A06aP01';
import { PageProps } from '.';

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
    subKey: 'RECORDER-0',
  };

  const data: IListenAndAnswer[] = [
    {
      content: "Dont't run, please",
      audioSrc: '/L01/C03/A07b/EE4-L01-C03-A07b-P01.wav',
    },
    {
      content: "Dont't push, please",
      audioSrc: '/L01/C03/A07b/EE4-L01-C03-A07b-P02.wav',
    },
    {
      content: "Dont't talk, please",
      audioSrc: '/L01/C03/A07b/EE4-L01-C03-A07b-P03.wav',
    },
    {
      content: "Dont't enter, please",
      audioSrc: '/L01/C03/A07b/EE4-L01-C03-A07b-P01.wav',
    },
  ];

  return (
    <EE4L05C01A06aP01
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
