import { getCorrectData, getDefaultData } from './pageData';

import EE4L05C01A06b from '@/Pages/EE4L05C01A06b';

const P01 = () => {
  return (
    <EE4L05C01A06b
      layout={{
        headerInfo: {
          headerText: 'Listen and Do',
          headerPattern: 'text' as const,
        },
        questionInfo: {
          text: '1.잘 듣고, 제안한 내용과 그 대답을 각각 골라 봅시다',
        },
        audioInfo: { audioSrc: '/L05/C01/A06b/EE4-L05-C01-A06b-P02.mp3', captionSrc: '/L05/C01/A06b/EE4-L05-C01-A06b-P02.srt' },
      }}
      imgArr={[
        {
          src: '/L05/C01/A06b/EE4-L05-C01-A06b-P01-01.jpg',
          alt: '배드민턴 라켓과 셔틀콕을 들고 있는 남자아이',
          title: '배드민턴 라켓과 셔틀콕을 들고 있는 남자아이',
          value: '배드민턴 하는 모습',
        },

        {
          src: '/L05/C01/A06b/EE4-L05-C01-A06b-P01-02.jpg',
          alt: '야구 하는 아이들',
          title: '야구 하는 모습',
          value: '야구 하는 모습',
        },
        {
          src: '/L05/C01/A06b/EE4-L05-C01-A06b-P01-03.jpg',
          alt: '농구공을 들고 있는 여자아이',
          title: '농구공을 들고 있는 여자아이',
          value: '농구 하는 모습',
        },
        {
          src: '/L05/C01/A06b/EE4-L05-C01-A06b-P01-04.jpg',
          alt: 'Sure.이라고 적힌 말풍선과 활짝 웃고 있는 표정',
          title: 'Sure.',
          value: 'Sure.',
        },
        {
          src: '/L05/C01/A06b/EE4-L05-C01-A06b-P01-05.jpg',
          alt: 'Sorry, I can’t.라고 적힌 말풍선과 슬픈 표정',
          title: 'Sorry.',
          value: 'Sorry, I can’t.',
        },
      ]}
      pageData={{
        pageNumber: 2,
        mainKey: 2,
        subKey: 'TEXT-1',
        getDefaultData: getDefaultData,
        getCorrectData: getCorrectData,
      }}
    />
  );
};

export default P01;
