import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData } from './pageData';
import EELK2C01A02P01, { IListenAndAnswer, IPageInfo } from '@/Pages/EELK2C01A02P01';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Expressions',
  };

  const questionInfo: IQuestionProps = {
    text: 'Lesson 5에서 학습한 표현을 복습해 봅시다.',
    size: 'large',
  };

  const pageInfo: IPageInfo = {
    pageNum: 2,
    mainKey: 2,
    subKey: ['RECORDER-01', 'RECORDER-02'],
  };

  const data: IListenAndAnswer[] = [
    {
      content: 'Let’s play soccer.',
      subContent: '- Sure. / - Sorry, I can’t.',
      audioSrc: '/LK2/C01/A02/EE4-LK2-C01-A02-P02-01.mp3',
    },
    {
      content: 'Sorry, I can’t. I’m busy.',
      audioSrc: '/LK2/C01/A02/EE4-LK2-C01-A02-P02-01.mp3',
    },
  ];

  return (
    <>
      <EELK2C01A02P01
        headerInfo={headerInfo}
        questionInfo={questionInfo}
        data={data}
        pageInfo={pageInfo}
        getCorrectData={getCorrectData}
        getDefaultData={getDefaultData}
      />
    </>
  );
};

export default P02;
