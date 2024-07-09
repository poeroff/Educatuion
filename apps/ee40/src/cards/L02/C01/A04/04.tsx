// Page: EE4-L02-C01-A04-P04

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
      audioInfo={{ audioSrc: '/L02/C01/A04/EE4-L02-C01-A04-P04.mp3', captionSrc: '/L02/C01/A04/EE4-L02-C01-A04-P04.srt' }}
      imageList={[
        { src: '/L02/C01/A04/EE4-L02-C01-A04-P04-01.png', alt: '남자가 미소 짓고 있는 모습', value: 'dad' },
        { src: '/L02/C01/A04/EE4-L02-C01-A04-P04-02.png', alt: '이름표가 달린 가방', value: 'name' },
        { src: '/L02/C01/A04/EE4-L02-C01-A04-P04-03.png', alt: '여자 아이가 웃고 있는 모습', value: 'sister' },
      ]}
      mainKey={4}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      getSolutionData={getSolutionData}
    />
  );
};

export default P04;
