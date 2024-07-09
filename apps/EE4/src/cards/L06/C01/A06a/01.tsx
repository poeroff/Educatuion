import { getCorrectData, getDefaultData, getSolutionData } from './pageData';
import EE4L06C01A06aP01 from '@/Pages/EE4L06C01A06aP01';

const P01 = () => {
  return (
    <EE4L06C01A06aP01
      headerInfo={{
        headerText: 'Words',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: '단어를 듣고, 알맞은 단어 카드를 골라 빈칸에 옮겨 봅시다.',
      }}
      audioInfo={{
        audioSrc: '/L06/C01/A06a/EE4-L06-C01-A06a-P01.mp3',
        captionSrc: '/L06/C01/A06a/EE4-L06-C01-A06a-P01.srt',
      }}
      imageList={[
        { src: '/L06/C01/A06a/EE4-L06-C01-A06a-P01-01.jpg', alt: '요리하고 있는 여자아이', value: 'EE4-L06-C01-A06a-P01-01.jpg' },
        { src: '/L06/C01/A06a/EE4-L06-C01-A06a-P01-02.jpg', alt: '그림을 그리고 있는 남자아이', value: 'EE4-L06-C01-A06a-P01-02.jpg' },
        { src: '/L06/C01/A06a/EE4-L06-C01-A06a-P01-03.jpg', alt: '책을 읽고 있는 여자아이', value: 'EE4-L06-C01-A06a-P01-03.jpg' },
        { src: '/L06/C01/A06a/EE4-L06-C01-A06a-P01-04.jpg', alt: '음악을 듣고 있는 남자아이', value: 'EE4-L06-C01-A06a-P01-04.jpg' },
      ]}
      mainKey={4}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      getSolutionData={getSolutionData}
    />
  );
};

export default P01;
