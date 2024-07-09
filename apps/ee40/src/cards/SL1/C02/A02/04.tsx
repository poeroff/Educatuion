import EESL1C02A02P01 from '@/Pages/EESL1C02A02P01';
import { HighlightProps } from '@/Pages/EESL1C02A02P01';

const P04 = () => {
  const data: HighlightProps[] = [
    {
      en: 'I can dance.',
      highlightChar: 'dance',
    },
  ];

  return (
    <EESL1C02A02P01
      headerInfo={{
        headerText: 'About Me & My Friends',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: '할 수 있는 것을 말하는 표현에 쓸 수 있는 낱말을 복습해 봅시다.',
      }}
      imageList={[
        { src: '/SL1/C02/A02/EE4-SL1-C02-A02-P04-01.png', alt: '춤을 추는 사람', value: 'dance' },
        { src: '/SL1/C02/A02/EE4-SL1-C02-A02-P04-02.png', alt: '노래를 부르는 사람', value: 'sing' },
        { src: '/SL1/C02/A02/EE4-SL1-C02-A02-P04-03.png', alt: '빙판 위에서 스케이트를 타는 사람', value: 'skate' },
        { src: '/SL1/C02/A02/EE4-SL1-C02-A02-P04-04.png', alt: '스키를 타는 사람', value: 'ski' },
        { src: '/SL1/C02/A02/EE4-SL1-C02-A02-P04-05.png', alt: '수영하는 사람', value: 'swim' },
      ]}
      audioList={[
        { audioSrc: '/SL1/C02/A02/EE4-SL1-C02-A02-P04-02.mp3' },
        { audioSrc: '/SL1/C02/A02/EE4-SL1-C02-A02-P04-03.mp3' },
        { audioSrc: '/SL1/C02/A02/EE4-SL1-C02-A02-P04-04.mp3' },
        { audioSrc: '/SL1/C02/A02/EE4-SL1-C02-A02-P04-05.mp3' },
        { audioSrc: '/SL1/C02/A02/EE4-SL1-C02-A02-P04-06.mp3' },
      ]}
      mainAudio={{ audioSrc: '/SL1/C02/A02/EE4-SL1-C02-A02-P04-01.mp3' }}
      boxWidth='220px'
      boxHeight='268px'
      boxGap={20}
      gridCol={3} // grid repeat
      data={data}
    />
  );
};

export default P04;
