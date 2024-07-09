// Page: EE4-L06-C01-A04-P04

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
        audioSrc: '/L06/C01/A04/EE4-L06-C01-A04-P04.mp3',
        // captionSrc: '/L06/C01/A04/EE4-L06-C01-A04-P04.srt'
      }}
      imageList={[
        { src: '/L06/C01/A04/EE4-L06-C01-A04-P04-01.png', alt: '바닥을 쓸고 있는 남자아이의 모습', value: 'clean' },
        { src: '/L06/C01/A04/EE4-L06-C01-A04-P04-02.png', alt: '그림을 그리고 있는 여자아이의 모습', value: 'draw' },
        { src: '/L06/C01/A04/EE4-L06-C01-A04-P04-03.png', alt: '로봇을 조립하는 여자아이의모습', value: 'make' },
      ]}
      mainKey={4}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      getSolutionData={getSolutionData}
    />
  );
};

export default P04;