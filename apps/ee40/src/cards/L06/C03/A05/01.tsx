import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { getCorrectData, getDefaultData } from './pageData';
import EEL06C03A05P01 from '@/Pages/EEL06C03A05P01';
import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { IListenAndAnswer } from '@/Pages/EEL05C03A05P01';
const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Words and Sentences 1',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: '낱말과 어구를 하나씩 잘 듣고, 따라 말해 봅시다.',
    size: 'large',
  };

  const imgInfo = {
    src: '/L06/C03/A05/EE4-L06-C03-A05-P01.JPG',
    alt: '백설공주와 다섯 난쟁이의 모습, 청소를 하는 난쟁이에게는 cleaning, 책을 읽는 난쟁이에게는 reading a book, 그림을 그리는 난쟁이에게는 drawing a picture, 요리를 하는 난쟁이에게는 cooking, 음악을 듣고 있는 난쟁이에게는 listening to music이라고 쓰여 있는 그림',
    width: '360px',
    height: '274px',
  };

  const pageInfo = {
    pageNum: 1,
    mainKey: 1,
    subKey: 'RECORDER-0',
  };

  const data: IListenAndAnswer[] = [
    {
      content: 'cleaning',
      audioSrc: '/L06/C03/A05/EE4-L06-C03-A05-P01-01.mp3',
    },
    {
      content: 'reading a book',
      audioSrc: '/L06/C03/A05/EE4-L06-C03-A05-P01-02.mp3',
    },
    {
      content: 'drawing a picture',
      audioSrc: '/L06/C03/A05/EE4-L06-C03-A05-P01-03.mp3',
    },
    {
      content: 'cooking',
      audioSrc: '/L06/C03/A05/EE4-L06-C03-A05-P01-04.mp3',
    },
    {
      content: 'listening to music',
      audioSrc: '/L06/C03/A05/EE4-L06-C03-A05-P01-05.mp3',
    },
  ];

  return (
    <EEL06C03A05P01
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
