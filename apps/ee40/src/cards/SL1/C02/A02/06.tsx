import EESL1C02A02P01 from '@/Pages/EESL1C02A02P01';
import { HighlightProps } from '@/Pages/EESL1C02A02P01';

const P06 = () => {
  const data: HighlightProps[] = [
    {
      en: 'I like bears.',
      highlightChar: 'bears',
    },
  ];

  return (
    <EESL1C02A02P01
      headerInfo={{
        headerText: 'About Me & My Friends',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: '좋아하는 동물을 말하는 표현에 쓸 수 있는 낱말을 복습해 봅시다.',
      }}
      imageList={[
        { src: '/SL1/C02/A02/EE4-SL1-C02-A02-P06-01.png', alt: '곰 캐릭터', value: 'bear' },
        { src: '/SL1/C02/A02/EE4-SL1-C02-A02-P06-02.png', alt: '고양이 캐릭터', value: 'cat' },
        { src: '/SL1/C02/A02/EE4-SL1-C02-A02-P06-03.png', alt: '강아지 캐릭터', value: 'dog' },
        { src: '/SL1/C02/A02/EE4-SL1-C02-A02-P06-04.png', alt: '원숭이 캐릭터', value: 'monkey' },
        { src: '/SL1/C02/A02/EE4-SL1-C02-A02-P06-05.png', alt: '토끼 캐릭터', value: 'rabbit' },
      ]}
      audioList={[
        { audioSrc: '/SL1/C02/A02/EE4-SL1-C02-A02-P06-02.mp3' },
        { audioSrc: '/SL1/C02/A02/EE4-SL1-C02-A02-P06-03.mp3' },
        { audioSrc: '/SL1/C02/A02/EE4-SL1-C02-A02-P06-04.mp3' },
        { audioSrc: '/SL1/C02/A02/EE4-SL1-C02-A02-P06-05.mp3' },
        { audioSrc: '/SL1/C02/A02/EE4-SL1-C02-A02-P06-06.mp3' },
      ]}
      mainAudio={{ audioSrc: '/SL1/C02/A02/EE4-SL1-C02-A02-P06-01.mp3' }}
      boxWidth='220px'
      boxHeight='268px'
      boxGap={20}
      gridCol={3} // grid repeat
      data={data}
    />
  );
};

export default P06;
