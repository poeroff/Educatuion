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
        audioSrc: '/L05/C01/A04/EE4-L05-C01-A04-P04.mp3',
        captionSrc: '/L05/C01/A04/EE4-L05-C01-A04.srt',
      }}
      imageList={[
        { src: '/L05/C01/A04/EE4-L05-C01-A04-P04-01.png', alt: '농구를 하고 있는 남자아이의 모습', value: 'basketball' },
        { src: '/L05/C01/A04/EE4-L05-C01-A04-P04-02.png', alt: '이불을 덮고 이마에 얼음 찜질을 하고 있는 사람의 모습', value: 'sick' },
        { src: '/L05/C01/A04/EE4-L05-C01-A04-P04-03.png', alt: '축구를 하는 여자아이의 모습', value: 'soccer' },
      ]}
      mainKey={4}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      getSolutionData={getSolutionData}
    />
  );
};

export default P04;
