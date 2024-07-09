import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { getCorrectData, getDefaultData } from './pageData';
import EEL01C03A05P01 from '@/Pages/EEL01C03A05P01';
import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { IListenAndAnswer } from '@/Pages/EEL01C03A05P01';

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
    src: '/L08/C03/A05/EE4-L08-C03-A05-P01.JPG',
    alt: '집 마당에서 우산(umbrella), 야구 글러브(glove), 장난감 자동차(car), 장난감 배(boat), 손목시계(watch), 인형(doll)을 파는 벼룩시장이 열린 그림',
    width: '520px',
    height: '335px',
  };

  const pageInfo = {
    pageNum: 1,
    mainKey: 1,
    subKey: 'RECORDER-0',
  };

  const data: IListenAndAnswer[] = [
    {
      content: 'umbrella',
      audioSrc: '/L08/C03/A05/EE4-L08-C03-A05-P01-01.mp3',
    },
    {
      content: 'glove',
      audioSrc: '/L08/C03/A05/EE4-L08-C03-A05-P01-02.mp3',
    },
    {
      content: 'car',
      audioSrc: '/L08/C03/A05/EE4-L08-C03-A05-P01-03.mp3',
    },
    {
      content: 'boat',
      audioSrc: '/L08/C03/A05/EE4-L08-C03-A05-P01-04.mp3',
    },
    {
      content: 'watch',
      audioSrc: '/L08/C03/A05/EE4-L08-C03-A05-P01-05.mp3',
    },
    {
      content: 'doll',
      audioSrc: '/L08/C03/A05/EE4-L08-C03-A05-P01-06.mp3',
    },
  ];

  return (
    <EEL01C03A05P01
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
