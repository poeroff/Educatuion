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
      content: 'My dress is red.',
      audioSrc: '/L10/C03/A07/EE4-L10-C03-A07-P01-01.mp3',
    },
    {
      content: 'My coat is short.',
      audioSrc: '/L10/C03/A07/EE4-L10-C03-A07-P01-02.mp3',
    },
    {
      content: 'My cap is blue.',
      audioSrc: '/L10/C03/A07/EE4-L10-C03-A07-P01-03.mp3',
    },
    {
      content: 'My scarf is long.',
      audioSrc: '/L10/C03/A07/EE4-L10-C03-A07-P01-04.mp3',
    },
  ];

  return (
    <EEL01C03A07P01
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
