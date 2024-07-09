import EEL01C01A04P04 from '@/Pages/EEL01C01A04P04';
import { getCorrectData, getDefaultData, getSolutionData } from './pageData';

const P04 = () => {
  return (
    <EEL01C01A04P04
      headerInfo={{
        headerText: 'Words',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: '단어를 듣고, 알맞은 단어 카드를 골라 빈칸에 옮겨 봅시다.',
      }}
      audioInfo={{
        audioSrc: '/L01/C01/A04/EE4-L01-C01-A04-P04.mp3',
        captionSrc: '/L01/C01/A04/EE4-L01-C01-A04.srt',
      }}
      imageList={[
        { src: '/L01/C01/A04/EE4-L01-C01-A04-P04-01.png', alt: '해가 지고 있는 모습', value: 'evening' },
        { src: '/L01/C01/A04/EE4-L01-C01-A04-P04-02.png', alt: '여자 아이가 엄지 손가락을 올리고 웃고 있는 모습', value: 'good' },
        { src: '/L01/C01/A04/EE4-L01-C01-A04-P04-03.png', alt: '해가 떠오르고 있는 모습', value: 'morning' },
      ]}
      mainKey={4}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      getSolutionData={getSolutionData}
    />
  );
};

export default P04;
