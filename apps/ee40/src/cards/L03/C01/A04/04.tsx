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
      audioInfo={{ audioSrc: '/L03/C01/A04/EE4-L03-C01-A04-P04.mp3', captionSrc: '/L03/C01/A04/EE4-L03-C01-A04-P04.srt' }}
      imageList={[
        { src: '/L03/C01/A04/EE4-L03-C01-A04-P04-01.png', alt: '할머니가 웃고 있는 모습', value: 'grandma' },
        { src: '/L03/C01/A04/EE4-L03-C01-A04-P04-02.png', alt: '귀여운 아기', value: 'cute' },
        { src: '/L03/C01/A04/EE4-L03-C01-A04-P04-03.png', alt: '두 친구가 어깨동무하고 있는 모습', value: 'friend' },
      ]}
      mainKey={4}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      getSolutionData={getSolutionData}
    />
  );
};

export default P04;
