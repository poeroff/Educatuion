import { getCorrectData, getDefaultData } from './pageData';

import EE4L05C01A06aP02 from '@/Pages/EE4L05C01A06aP02';

const P02 = () => {
  return (
    <EE4L05C01A06aP02
      layout={{
        headerInfo: {
          headerText: 'Listen and Do',
          headerPattern: 'text' as const,
        },
        questionInfo: {
          text: '다시 한번 듣고, 함께 하자고 한 운동에는 O, 할 수 없다고 한 운동에는 X표시를 해봅시다',
        },
        audioInfo: { audioSrc: '/L05/C01/A06a/EE4-L05-C01-A06a-P02.mp3', captionSrc: '/L05/C01/A06a/ EE4-L05-C01-A06a-P02.srt' },
      }}
      imgArr={[
        {
          src: '/L05/C01/A06a/EE4-L05-C01-A06a-P02-01.jpg',
          alt: '배드민턴을 하는 아이',
          title: '배드민턴을 하는 아이',
        },
        {
          src: '/L05/C01/A06a/EE4-L05-C01-A06a-P02-02.jpg',
          alt: '야구 하는 아이들',
          title: '야구 하는 아이들',
        },
        {
          src: '/L05/C01/A06a/EE4-L05-C01-A06a-P02-03.jpg',
          alt: '농구 하는 아이들',
          title: '농구 하는 아이들',
        },
      ]}
      pageData={{
        pageNumber: 2,
        mainKey: 2,
        subKey: 'TEXT-01',
        getDefaultData: getDefaultData,
        getCorrectData: getCorrectData,
      }}
    />
  );
};

export default P02;
