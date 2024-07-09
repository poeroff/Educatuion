import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData } from './pageData';
import EELK2C01A02P01, { IListenAndAnswer, IPageInfo } from '@/Pages/EELK2C01A02P01';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Expressions',
  };

  const questionInfo: IQuestionProps = {
    text: 'Lesson 4에서 학습한 표현을 복습해 봅시다.',
    size: 'large',
  };

  const pageInfo: IPageInfo = {
    pageNum: 1,
    mainKey: 1,
    subKey: ['RECORDER-01', 'RECORDER-02', 'RECORDER-03'],
  };

  const data: IListenAndAnswer[] = [
    {
      content: 'This is my dad.',
      audioSrc: '/LK2/C01/A02/EE4-LK2-C01-A02-P01-01.mp3',
    },
    {
      content: 'Line up, please.',
      audioSrc: '/LK2/C01/A02/EE4-LK2-C01-A02-P01-02.mp3',
    },
    {
      content: 'Put on this helmet, please.',
      audioSrc: '/LK2/C01/A02/EE4-LK2-C01-A02-P01-03.mp3',
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

export default P01;
