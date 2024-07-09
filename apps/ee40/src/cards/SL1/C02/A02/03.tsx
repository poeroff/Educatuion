import EESL1C02A02P01 from '@/Pages/EESL1C02A02P01';
import { HighlightProps } from '@/Pages/EESL1C02A02P01';

const P03 = () => {
  const data: HighlightProps[] = [
    {
      en: 'I’m angry.',
      highlightChar: 'angry',
    },
  ];

  return (
    <EESL1C02A02P01
      headerInfo={{
        headerText: 'About Me & My Friends',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: '감정과 상태를 말하는 표현에 쓸 수 있는 낱말을 복습해 봅시다.',
      }}
      imageList={[
        { src: '/SL1/C02/A02/EE4-SL1-C02-A02-P03-01.png', alt: '화나 보이는 곰 캐릭터', value: 'angry' },
        { src: '/SL1/C02/A02/EE4-SL1-C02-A02-P03-02.png', alt: '배불러 보이는 곰 캐릭터', value: 'full' },
        { src: '/SL1/C02/A02/EE4-SL1-C02-A02-P03-03.png', alt: '행복한 보이는 곰 캐릭터', value: 'happy' },
        { src: '/SL1/C02/A02/EE4-SL1-C02-A02-P03-04.png', alt: '배고파 보이는 곰 캐릭터', value: 'hungry' },
        { src: '/SL1/C02/A02/EE4-SL1-C02-A02-P03-05.png', alt: '슬퍼 보이는 곰 캐릭터', value: 'sad' },
        { src: '/SL1/C02/A02/EE4-SL1-C02-A02-P03-06.png', alt: '지쳐 보이는 곰 캐릭터', value: 'tired' },
      ]}
      audioList={[
        { audioSrc: '/SL1/C02/A02/EE4-SL1-C02-A02-P03-02.mp3' },
        { audioSrc: '/SL1/C02/A02/EE4-SL1-C02-A02-P03-03.mp3' },
        { audioSrc: '/SL1/C02/A02/EE4-SL1-C02-A02-P03-04.mp3' },
        { audioSrc: '/SL1/C02/A02/EE4-SL1-C02-A02-P03-05.mp3' },
        { audioSrc: '/SL1/C02/A02/EE4-SL1-C02-A02-P03-06.mp3' },
        { audioSrc: '/SL1/C02/A02/EE4-SL1-C02-A02-P03-07.mp3' },
      ]}
      mainAudio={{ audioSrc: '/SL1/C02/A02/EE4-SL1-C02-A02-P03-01.mp3' }}
      boxWidth='220px'
      boxHeight='268px'
      boxGap={20}
      gridCol={3} // grid repeat
      data={data}
    />
  );
};

export default P03;
