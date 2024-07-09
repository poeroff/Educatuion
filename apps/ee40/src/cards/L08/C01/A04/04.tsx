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
        audioSrc: '/L08/C01/A04/EE4-L08-C01-A04-P04.mp3',
        captionSrc: '/L08/C01/A04/EE4-L08-C01-A04.srt',
      }}
      imageList={[
        { src: '/L08/C01/A04/EE4-L08-C01-A04-P04-01.png', alt: '손목시계', value: 'watch' },
        { src: '/L08/C01/A04/EE4-L08-C01-A04-P04-02.png', alt: '자동차', value: 'car' },
        { src: '/L08/C01/A04/EE4-L08-C01-A04-P04-03.png', alt: '야구 글러브', value: 'glove' },
      ]}
      mainKey={4}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      getSolutionData={getSolutionData}
    />
  );
};

export default P04;
