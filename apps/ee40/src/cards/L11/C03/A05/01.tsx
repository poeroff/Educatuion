import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { getCorrectData, getDefaultData } from './pageData';
import EEL11C03A05P01 from '@/Pages/EEL11C03A05P01';
import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { IListenAndAnswer } from '@/Pages/EEL11C03A05P01';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Words and Sentences 1',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: '낱말을 하나씩 잘 듣고, 따라 말해 봅시다.',
    size: 'large',
  };

  const imgInfo = {
    src: '/L11/C03/A05/EE4-L11-C03-A05-P01.JPG',
    alt: '코끼리 선생님과 닭, 원숭이, 곰, 강아지, 고양이, 양, 거북이 학생들이 수업하고 있는 그림, Monday라고 적힌 노트를 들고 있는 닭, Tuesday라고 적힌 노트를 들고 있는 원숭이, Wednesday라고 적힌 노트를 들고 있는 곰, Thursday라고 적힌 노트를 들고 있는 강아지, Friday라고 적힌 노트를 들고 있는 고양이, Saturday라고 적힌 노트를 들고 있는 양, Sunday라고 적힌 노트를 들고 있는 거북이 그림',
    width: '480px',
    height: '394px',
  };

  const pageInfo = {
    pageNum: 1,
    mainKey: 1,
    subKey: 'RECORDER-0',
  };

  const data: IListenAndAnswer[] = [
    {
      content: 'Monday',
      audioSrc: '/L11/C03/A05/EE4-L11-C03-A05-P01-01.mp3',
    },
    {
      content: 'Tuesday',
      audioSrc: '/L11/C03/A05/EE4-L11-C03-A05-P01-02.mp3',
    },
    {
      content: 'Wednesday',
      audioSrc: '/L11/C03/A05/EE4-L11-C03-A05-P01-03.mp3',
    },
    {
      content: 'Thursday',
      audioSrc: '/L11/C03/A05/EE4-L11-C03-A05-P01-04.mp3',
    },
    {
      content: 'Friday',
      audioSrc: '/L11/C03/A05/EE4-L11-C03-A05-P01-05.mp3',
    },
    {
      content: 'Saturday',
      audioSrc: '/L11/C03/A05/EE4-L11-C03-A05-P01-06.mp3',
    },
    {
      content: 'Sunday',
      audioSrc: '/L11/C03/A05/EE4-L11-C03-A05-P01-07.mp3',
    },
  ];

  return (
    <EEL11C03A05P01
      imageInfo={imgInfo}
      headerInfo={headerInfo}
      pageInfo={pageInfo}
      getCorrectData={getCorrectData}
      questionInfo={questionInfo}
      getDefaultData={getDefaultData}
      data={data}
    />
  );
};

export default P01;
