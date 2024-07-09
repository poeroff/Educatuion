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
        audioSrc: '/L04/C01/A04/EE4-L04-C01-A04-P04.mp3',
        // captionSrc: '/L04/C01/A04/EE4-L04-C01-A04.srt'
      }}
      imageList={[
        { src: '/L04/C01/A04/EE4-L04-C01-A04-P04-01.png', alt: ' 대화를 하고 있는 두 학생의 모습', value: 'talk' },
        { src: '/L04/C01/A04/EE4-L04-C01-A04-P04-02.png', alt: '학교 앞에서 달리고 있는 여학생의 모습', value: 'run' },
        { src: '/L04/C01/A04/EE4-L04-C01-A04-P04-03.png', alt: '문으로 들어가고 있는 사람의 모습', value: 'enter' },
      ]}
      mainKey={4}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      getSolutionData={getSolutionData}
    />
  );
};

export default P04;
