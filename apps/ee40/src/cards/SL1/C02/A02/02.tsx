import EESL1C02A02P01 from '@/Pages/EESL1C02A02P01';
import { HighlightProps } from '@/Pages/EESL1C02A02P01';

const P02 = () => {
  const data: HighlightProps[] = [
    {
      en: 'I’m seven years old.',
      highlightChar: 'seven',
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
        { src: '/SL1/C02/A02/EE4-SL1-C02-A02-P02-01.png', alt: '숫자 7', value: 'seven' },
        { src: '/SL1/C02/A02/EE4-SL1-C02-A02-P02-02.png', alt: '숫자 8', value: 'eight' },
        { src: '/SL1/C02/A02/EE4-SL1-C02-A02-P02-03.png', alt: '숫자 9', value: 'nine' },
        { src: '/SL1/C02/A02/EE4-SL1-C02-A02-P02-04.png', alt: '숫자 10', value: 'ten' },
      ]}
      audioList={[
        { audioSrc: '/SL1/C02/A02/EE4-SL1-C02-A02-P02-02.mp3' },
        { audioSrc: '/SL1/C02/A02/EE4-SL1-C02-A02-P02-03.mp3' },
        { audioSrc: '/SL1/C02/A02/EE4-SL1-C02-A02-P02-04.mp3' },
        { audioSrc: '/SL1/C02/A02/EE4-SL1-C02-A02-P02-05.mp3' },
      ]}
      mainAudio={{ audioSrc: '/SL1/C02/A02/EE4-SL1-C02-A02-P02-01.mp3' }}
      boxWidth='220px'
      boxHeight='268px'
      boxGap={20}
      gridCol={2} // grid repeat
      data={data}
    />
  );
};

export default P02;
