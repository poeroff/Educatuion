import EEL01C01A04P04 from '@/Pages/EEL01C01A04P04';
import { getCorrectData, getDefaultData, getSolutionData } from './pageData';

const P03 = () => {
  return (
    <EEL01C01A04P04
      headerInfo={{
        headerText: 'Classroom English',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: '표현을 듣고, 알맞은 표현 카드를 골라 빈칸에 넣어 봅시다.',
      }}
      audioInfo={{
        audioSrc: '/SL1/C01/A03/EE4-SL1-C01-A03-P03.mp3',
        captionSrc: '/SL1/C01/A03/EE4-SL1-C01-A03-P03.srt',
      }}
      imageList={[
        {
          src: '/SL1/C01/A03/EE4-SL1-C01-A03-P03-01.png',
          alt: '자리에 앉아 책을 펴고 읽고 있는 아이, 책을 펴는 방향을 나타내는 화살표',
          value: 'Open your books.',
        },
        { src: '/SL1/C01/A03/EE4-SL1-C01-A03-P03-02.png', alt: '의자에서 일어나는 아이, 위로 향하는 화살표', value: 'Stand up.' },
        { src: '/SL1/C01/A03/EE4-SL1-C01-A03-P03-03.png', alt: '자리에 앉아 손을 들고 있는 아이들, 위로 향하는 화살표', value: 'Hands up.' },
      ]}
      mainKey={3}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      getSolutionData={getSolutionData}
    />
  );
};

export default P03;
