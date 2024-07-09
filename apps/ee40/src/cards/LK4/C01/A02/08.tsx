import EEL01C01A04P01 from '@/Pages/EEL01C01A04P01';

const P08 = () => {
  return (
    <EEL01C01A04P01
      headerInfo={{
        headerText: 'Words',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: 'Lesson 11에서 학습한 단어를 복습해 봅시다.',
      }}
      imageList={[
        { src: '/LK4/C01/A02/EE4-LK4-C01-A02-P08-01.png', alt: '월요일', value: 'Monday', title: '월요일' },
        {
          src: '/LK4/C01/A02/EE4-LK4-C01-A02-P08-02.png',
          alt: '화요일',
          value: 'Tuesday',
          title: '화요일',
        },
        {
          src: '/LK4/C01/A02/EE4-LK4-C01-A02-P08-03.png',
          alt: '수요일',
          value: 'Wednesday',
          title: '수요일',
        },
        {
          src: '/LK4/C01/A02/EE4-LK4-C01-A02-P08-04.png',
          alt: '목요일',
          value: 'Thursday',
          title: '목요일',
        },
        {
          src: '/LK4/C01/A02/EE4-LK4-C01-A02-P08-05.png',
          alt: '금요일',
          value: 'Friday',
          title: '금요일',
        },
        {
          src: '/LK4/C01/A02/EE4-LK4-C01-A02-P08-06.png',
          alt: '토요일',
          value: 'Saturday',
          title: '토요일',
        },
        {
          src: '/LK4/C01/A02/EE4-LK4-C01-A02-P08-07.png',
          alt: '일요일',
          value: 'Sunday',
          title: '일요일',
        },
      ]}
      audioList={[
        { audioSrc: '/LK4/C01/A02/EE4-LK4-C01-A02-P08-01.mp3' },
        { audioSrc: '/LK4/C01/A02/EE4-LK4-C01-A02-P08-02.mp3' },
        { audioSrc: '/LK4/C01/A02/EE4-LK4-C01-A02-P08-03.mp3' },
        { audioSrc: '/LK4/C01/A02/EE4-LK4-C01-A02-P08-04.mp3' },
        { audioSrc: '/LK4/C01/A02/EE4-LK4-C01-A02-P08-05.mp3' },
        { audioSrc: '/LK4/C01/A02/EE4-LK4-C01-A02-P08-06.mp3' },
        { audioSrc: '/LK4/C01/A02/EE4-LK4-C01-A02-P08-07.mp3' },
      ]}
      cardWidth={'598px'}
      cardHeight={'364px'}
    />
  );
};

export default P08;
