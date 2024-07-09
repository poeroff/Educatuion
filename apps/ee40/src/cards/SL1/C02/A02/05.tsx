import EESL1C02A02P01 from '@/Pages/EESL1C02A02P01';
import { HighlightProps } from '@/Pages/EESL1C02A02P01';

const P05 = () => {
  const data: HighlightProps[] = [
    {
      en: 'I like chicken.',
      highlightChar: 'chicken',
    },
  ];

  return (
    <EESL1C02A02P01
      headerInfo={{
        headerText: 'About Me & My Friends',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: '좋아하는 음식을 말하는 표현에 쓸 수 있는 낱말을 복습해 봅시다.',
      }}
      imageList={[
        { src: '/SL1/C02/A02/EE4-SL1-C02-A02-P05-01.png', alt: '후라이드 치킨', value: 'chicken' },
        { src: '/SL1/C02/A02/EE4-SL1-C02-A02-P05-02.png', alt: '생선구이', value: 'fish' },
        { src: '/SL1/C02/A02/EE4-SL1-C02-A02-P05-03.png', alt: '피자', value: 'pizza' },
        { src: '/SL1/C02/A02/EE4-SL1-C02-A02-P05-04.png', alt: '샐러드', value: 'salad' },
        { src: '/SL1/C02/A02/EE4-SL1-C02-A02-P05-05.png', alt: '스테이크', value: 'steak' },
      ]}
      audioList={[
        { audioSrc: '/SL1/C02/A02/EE4-SL1-C02-A02-P05-02.mp3' },
        { audioSrc: '/SL1/C02/A02/EE4-SL1-C02-A02-P05-03.mp3' },
        { audioSrc: '/SL1/C02/A02/EE4-SL1-C02-A02-P05-04.mp3' },
        { audioSrc: '/SL1/C02/A02/EE4-SL1-C02-A02-P05-05.mp3' },
        { audioSrc: '/SL1/C02/A02/EE4-SL1-C02-A02-P05-06.mp3' },
      ]}
      mainAudio={{ audioSrc: '/SL1/C02/A02/EE4-SL1-C02-A02-P05-01.mp3' }}
      boxWidth='220px'
      boxHeight='268px'
      boxGap={20}
      gridCol={3} // grid repeat
      data={data}
    />
  );
};

export default P05;
