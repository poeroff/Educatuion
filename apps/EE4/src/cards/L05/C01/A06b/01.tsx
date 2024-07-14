import { getCorrectData, getDefaultData } from './pageData';

import EE4L05C01A06aP01 from '@/Pages/EE4L05C01A06aP01';

const P01 = () => {
  return (
    <EE4L05C01A06aP01
      layout={{
        headerInfo: {
          headerText: 'Listen and Do',
          headerPattern: 'text' as const,
        },
        questionInfo: {
          text: '1.잘 듣고, 아이들이 제안하지 않은 운동을 찾아 표시해 봅시다',
        },
        audioInfo: { audioSrc: '/L05/C01/A06a/EE4-L05-C01-A06a-P02.mp3', captionSrc: '/L05/C01/A06a/ EE4-L05-C01-A06a-P02.srt' },
      }}
      imgArr={[
        {
          src: '/L05/C01/A06a/EE4-L05-C01-A06a-P01-01.jpg',
          alt: '배드민턴을 하는 아이',
          title: '배드민턴 하는 모습',
          value: '배드민턴 하는 모습',
        },
        {
          src: '/L05/C01/A06a/EE4-L05-C01-A06a-P01-02.jpg',
          alt: '축구 하는 아이들',
          title: '축구 하는 모습',
          value: '축구 하는 모습',
        },
        {
          src: '/L05/C01/A06a/EE4-L05-C01-A06a-P01-03.jpg',
          alt: '야구 하는 아이들',
          title: '야구 하는 모습',
          value: '야구 하는 모습',
        },
        {
          src: '/L05/C01/A06a/EE4-L05-C01-A06a-P01-04.jpg',
          alt: '농구 하는 아이들',
          title: '농구 하는 모습',
          value: '농구 하는 모습',
        },
      ]}
      pageData={{
        pageNumber: 1,
        mainKey: 1,
        subKey: 'TEXT-01',
        getDefaultData: getDefaultData,
        getCorrectData: getCorrectData,
      }}
    />
  );
};

export default P01;
