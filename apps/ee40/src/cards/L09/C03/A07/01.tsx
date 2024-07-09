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
    subKey: ['RECORDER-01', 'RECORDER-02', 'RECORDER-03'],
  };

  const data: IListenAndAnswer[] = [
    {
      content: 'It’s under the bed.',
      audioSrc: '/L09/C03/A07/EEE4-L09-C03-A07-P01-01.mp3',
    },
    {
      content: 'It’s in the box.',
      audioSrc: '/L09/C03/A07/EE4-L09-C03-A07-P01-02.mp3',
    },
    {
      content: 'It’s on the desk.',
      audioSrc: '/L09/C03/A07/EE4-L09-C03-A07-P01-03.mp3',
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
