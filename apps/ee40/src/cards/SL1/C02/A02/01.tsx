import EESL1C02A02P01 from '@/Pages/EESL1C02A02P01';
import { HighlightProps } from '@/Pages/EESL1C02A02P01';

const P01 = () => {
  const data: HighlightProps[] = [
    {
      en: 'I’m one year old.',
      highlightChar: 'one',
    },
  ];

  return (
    <EESL1C02A02P01
      headerInfo={{
        headerText: 'About Me & My Friends',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: '나이를 말하는 표현에 쓸 수 있는 낱말을 복습해 봅시다.',
      }}
      imageList={[
        { src: '/SL1/C02/A02/EE4-SL1-C02-A02-P01-01.png', alt: '숫자 1', value: 'one' },
        { src: '/SL1/C02/A02/EE4-SL1-C02-A02-P01-02.png', alt: '숫자 2', value: 'two' },
        { src: '/SL1/C02/A02/EE4-SL1-C02-A02-P01-03.png', alt: '숫자 3', value: 'three' },
        { src: '/SL1/C02/A02/EE4-SL1-C02-A02-P01-04.png', alt: '숫자 4', value: 'four' },
        { src: '/SL1/C02/A02/EE4-SL1-C02-A02-P01-05.png', alt: '숫자 5', value: 'five' },
        { src: '/SL1/C02/A02/EE4-SL1-C02-A02-P01-06.png', alt: '숫자 6', value: 'six' },
      ]}
      audioList={[
        { audioSrc: '/SL1/C02/A02/EE4-SL1-C02-A02-P01-02.mp3' },
        { audioSrc: '/SL1/C02/A02/EE4-SL1-C02-A02-P01-03.mp3' },
        { audioSrc: '/SL1/C02/A02/EE4-SL1-C02-A02-P01-04.mp3' },
        { audioSrc: '/SL1/C02/A02/EE4-SL1-C02-A02-P01-05.mp3' },
        { audioSrc: '/SL1/C02/A02/EE4-SL1-C02-A02-P01-06.mp3' },
        { audioSrc: '/SL1/C02/A02/EE4-SL1-C02-A02-P01-07.mp3' },
      ]}
      mainAudio={{ audioSrc: '/SL1/C02/A02/EE4-SL1-C02-A02-P01-01.mp3' }}
      boxWidth='220px'
      boxHeight='268px'
      boxGap={20}
      gridCol={3} // grid repeat
      data={data}
    />
  );
};

export default P01;
