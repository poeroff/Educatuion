import { getCorrectData, getDefaultData, getSolutionData } from './pageData';
import EE4L04C03A07bP03 from '@/Pages/EE4L04C03A07bP03';

const P03 = () => {
  return (
    <EE4L04C03A07bP03
      headerInfo={{
        headerText: 'Words and Sentences 3',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: '문장을 보고, 알맞은 그림 카드를 골라 빈칸에 옮겨 봅시다.',
      }}
      audioInfo={{
        audioSrc: '/L01/C01/A04/EE4-L01-C01-A04-P04.mp3',
        captionSrc: '/L01/C01/A04/EE4-L01-C01-A04.srt',
      }}
      imageList={[
        {
          src: '/L04/C03/A07b/EE4-L04-C03-A07b-P03-01.jpg',
          alt: '영화관에서 떠들고 있는 아이들의 모습과 금지 표시',
          value: '/L04/C03/A07b/EE4-L04-C03-A07b-P03-01.jpg',
        },
        {
          src: '/L04/C03/A07b/EE4-L04-C03-A07b-P03-02.jpg',
          alt: '지하철을 기다리던 아이의 어깨를 미는 아이의 모습과 금지 표시',
          value: '/L04/C03/A07b/EE4-L04-C03-A07b-P03-02.jpg',
        },
      ]}
      mainKey={3}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      getSolutionData={getSolutionData}
    />
  );
};

export default P03;
