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
        audioSrc: '/L10/C01/A04/EE4-L10-C01-A04-P04.mp3',
        captionSrc: '/L10/C01/A04/EE4-L10-C01-A04.srt',
      }}
      imageList={[
        { src: '/L10/C01/A04/EE4-L10-C01-A04-P04-01.png', alt: '치마', value: 'skirt' },
        { src: '/L10/C01/A04/EE4-L10-C01-A04-P04-02.png', alt: '스카프', value: 'scarf' },
        { src: '/L10/C01/A04/EE4-L10-C01-A04-P04-03.png', alt: '빨간 리본이 달린 신발', value: 'shoe' },
      ]}
      mainKey={4}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      getSolutionData={getSolutionData}
    />
  );
};

export default P04;
