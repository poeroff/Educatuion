import EEL01C01A04P04 from '@/Pages/EEL01C01A04P04';
import { getCorrectData, getDefaultData, getSolutionData } from './pageData';

const P04 = () => {
  return (
    <EEL01C01A04P04
      headerInfo={{
        headerText: 'Phrases',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: '어구를 듣고, 알맞은 어구 카드를 골라 빈칸에 넣어 봅시다.',
      }}
      audioInfo={{ audioSrc: '/L12/C01/A04/EE4-L12-C01-A04-P04.mp3', captionSrc: '/L12/C01/A04/EE4-L12-C01-A04.srt' }}
      imageList={[
        { src: '/L12/C01/A04/EE4-L12-C01-A04-P04-01.png', alt: '영화를 보는 사람의 모습', value: 'watch movies' },
        { src: '/L12/C01/A04/EE4-L12-C01-A04-P04-02.png', alt: '피아노를 치고 있는 사람의 모습', value: 'play the piano' },
        { src: '/L12/C01/A04/EE4-L12-C01-A04-P04-03.png', alt: '공원에서 자전거를 타고 있는 아이의 모습', value: 'ride my bike' },
      ]}
      mainKey={4}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      getSolutionData={getSolutionData}
    />
  );
};

export default P04;
