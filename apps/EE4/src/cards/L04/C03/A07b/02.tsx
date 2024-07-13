import { getCorrectData, getDefaultData, getSolutionData } from './pageData';
import EE4L04C03A06bP02 from '@/Pages/EE4L04C03A07bP02';

const P02 = () => {
  return (
    <EE4L04C03A06bP02
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
          src: '/L04/C03/A07b/EE4-L04-C03-A07b-P02-01.jpg',
          alt: '계단을 위험하게 뛰어 내려가는 여자아이의 모습과 금지 표시',
          value: 'EE4-L04-C03-A07b-P02-01.jpg',
        },
        {
          src: '/L04/C03/A07b/EE4-L04-C03-A07b-P02-02.jpg',
          alt: '맨홀 뚜껑이 열려 있는 공사장에 들어가려는 아이의 모습과 금지 표시',
          value: 'EE4-L04-C03-A07b-P02-02.jpg',
        },
      ]}
      mainKey={2}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      getSolutionData={getSolutionData}
    />
  );
};

export default P02;
