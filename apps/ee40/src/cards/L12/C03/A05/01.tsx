import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { getCorrectData, getDefaultData } from './pageData';
import EEL12C03A05P01 from '@/Pages/EEL12C03A05P01';
import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { IListenAndAnswer } from '@/Pages/EEL01C03A05P01';
const EE40L01C03A01P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Words and Sentences 1',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: '어구를 하나씩 잘 듣고, 따라 말해 봅시다',
    size: 'large',
  };

  const imgInfo = {
    src: '/L12/C03/A05/EE4-L12-C03-A05-P01.JPG',
    alt: '야외에서 자전거를 타는 아이의 모습에 쓰여 있는 ride my bike, 강아지 산책을 시키는 아이의 모습에 쓰여 있는 walk my dog, 집에서 영화를 보는 아이의 모습에 쓰여 있는 watch movies, 피아노를 치는 아이의 모습에 쓰여 있는 play the piano',
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
      content: 'ride my bike',
      audioSrc: '/L12/C03/A05/EE4-L12-C03-A05-P01-01.mp3',
    },
    {
      content: 'walk my dog',
      audioSrc: '/L12/C03/A05/EE4-L12-C03-A05-P01-02.mp3',
    },
    {
      content: 'watch movies',
      audioSrc: '/L12/C03/A05/EE4-L12-C03-A05-P01-03.mp3',
    },
    {
      content: 'play the piano',
      audioSrc: '/L12/C03/A05/EE4-L12-C03-A05-P01-04.mp3',
    },
  ];

  return (
    <EEL12C03A05P01
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

export default EE40L01C03A01P01;
