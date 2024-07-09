import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData } from './pageData';
import EELK2C01A02P01, { IListenAndAnswer, IPageInfo } from '@/Pages/EELK2C01A02P01';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Expressions',
  };

  const questionInfo: IQuestionProps = {
    text: 'Lesson 3에서 학습한 표현을 복습해 봅시다.',
    size: 'large',
  };

  const pageInfo: IPageInfo = {
    pageNum: 3,
    mainKey: 3,
    subKey: ['RECORDER-01', 'RECORDER-02'],
  };

  const data: IListenAndAnswer[] = [
    {
      content: 'Who is she?',
      subContent: '- She’s my grandma.',
      audioSrc: '/LK1/C01/A02/EE4-LK1-C01-A02-P03-01.mp3',
    },
    {
      content: 'He’s tall.',
      subContent: '',
      audioSrc: '/LK1/C01/A02/EE4-LK1-C01-A02-P03-02.mp3',
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

export default P03;
