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
        audioSrc: '/L09/C01/A04/EE4-L09-C01-A04-P04.mp3',
        captionSrc: '/L09/C01/A04/EE4-L09-C01-A04.srt',
      }}
      imageList={[
        { src: '/L09/C01/A04/EE4-L09-C01-A04-P04-01.png', alt: '책상', value: 'desk' },
        { src: '/L09/C01/A04/EE4-L09-C01-A04-P04-02.png', alt: '탁자 아래에 있는 공을 가리키는 화살표', value: 'under' },
        { src: '/L09/C01/A04/EE4-L09-C01-A04-P04-03.png', alt: '바구니 안에 담긴 공을 가리키는 화살표', value: 'in' },
      ]}
      mainKey={4}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      getSolutionData={getSolutionData}
    />
  );
};

export default P04;
