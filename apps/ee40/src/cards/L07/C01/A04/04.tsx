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
        audioSrc: '/L07/C01/A04/EE4-L07-C01-A04-P04.mp3',
        captionSrc: '/L07/C01/A04/EE4-L07-C01-A04.srt',
      }}
      imageList={[
        { src: '/L07/C01/A04/EE4-L07-C01-A04-P04-01.png', alt: '알람 시계', value: 'time' },
        { src: '/L07/C01/A04/EE4-L07-C01-A04-P04-02.png', alt: '침대와 알람 시계', value: 'bed' },
        { src: '/L07/C01/A04/EE4-L07-C01-A04-P04-03.png', alt: '7시를 가리키는 시계와 간단한 식사가 차려진 밥상', value: 'breakfast' },
      ]}
      mainKey={4}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      getSolutionData={getSolutionData}
    />
  );
};

export default P04;
