import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData } from './pageData';
import EEL01C03A07P01, { IListenAndAnswer, IPageInfo } from '@/Pages/EEL01C03A07P01';

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
      content: 'I want this watch.',
      audioSrc: '/L08/C03/A07/EE4-L08-C03-A07-P01.mp3',
    },
    {
      content: 'I want this glove.',
      audioSrc: '/L08/C03/A07/EE4-L08-C03-A07-P02.mp3',
    },
    {
      content: 'I want this umbrella.',
      audioSrc: '/L08/C03/A07/EE4-L08-C03-A07-P03.mp3',
    },
    {
      content: 'I want this boat.',
      audioSrc: '/L08/C03/A07/EE4-L08-C03-A07-P04.mp3',
    },
  ];

  return (
    <>
      <EEL01C03A07P01
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
