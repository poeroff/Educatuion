import EESL1C02A02P01 from '@/Pages/EESL1C02A02P01';
import { HighlightProps } from '@/Pages/EESL1C02A02P01';

const P07 = () => {
  const data: HighlightProps[] = [
    {
      en: 'I like red.',
      highlightChar: 'red',
    },
  ];

  return (
    <EESL1C02A02P01
      headerInfo={{
        headerText: 'About Me & My Friends',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: '좋아하는 색깔을 말하는 표현에 쓸 수 있는 낱말을 복습해 봅시다.',
      }}
      imageList={[
        { src: '/SL1/C02/A02/EE4-SL1-C02-A02-P07-01.png', alt: '빨간색 크레파스로 칠한 모습', value: 'red' },
        { src: '/SL1/C02/A02/EE4-SL1-C02-A02-P07-02.png', alt: '주황색 크레파스로 칠한 모습', value: 'orange' },
        { src: '/SL1/C02/A02/EE4-SL1-C02-A02-P07-03.png', alt: '노란색 크레파스로 칠한 모습', value: 'yellow' },
        { src: '/SL1/C02/A02/EE4-SL1-C02-A02-P07-04.png', alt: '초록색 크레파스로 칠한 모습', value: 'green' },
        { src: '/SL1/C02/A02/EE4-SL1-C02-A02-P07-05.png', alt: '파란색 크레파스로 칠한 모습', value: 'blue' },
        { src: '/SL1/C02/A02/EE4-SL1-C02-A02-P07-06.png', alt: '검은색 크레파스로 칠한 모습', value: 'black' },
      ]}
      audioList={[
        { audioSrc: '/SL1/C02/A02/EE4-SL1-C02-A02-P07-02.mp3' },
        { audioSrc: '/SL1/C02/A02/EE4-SL1-C02-A02-P07-03.mp3' },
        { audioSrc: '/SL1/C02/A02/EE4-SL1-C02-A02-P07-04.mp3' },
        { audioSrc: '/SL1/C02/A02/EE4-SL1-C02-A02-P07-05.mp3' },
        { audioSrc: '/SL1/C02/A02/EE4-SL1-C02-A02-P07-06.mp3' },
        { audioSrc: '/SL1/C02/A02/EE4-SL1-C02-A02-P07-07.mp3' },
      ]}
      mainAudio={{ audioSrc: '/SL1/C02/A02/EE4-SL1-C02-A02-P07-01.mp3' }}
      boxWidth='220px'
      boxHeight='268px'
      boxGap={20}
      gridCol={3} // grid repeat
      data={data}
    />
  );
};

export default P07;
