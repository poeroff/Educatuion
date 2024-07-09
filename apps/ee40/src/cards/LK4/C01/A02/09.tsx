import EEL01C01A04P01 from '@/Pages/EEL01C01A04P01';

const P09 = () => {
  return (
    <EEL01C01A04P01
      headerInfo={{
        headerText: 'Words',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: 'Lesson 12에서 학습한 단어를 복습해 봅시다.',
      }}
      imageList={[
        { src: '/LK4/C01/A02/EE4-LK4-C01-A02-P09-01.png', alt: '피아노를 치고 있는 아이', value: 'play the piano', title: '피아노를 치다' },
        {
          src: '/LK4/C01/A02/EE4-LK4-C01-A02-P09-02.png',
          alt: '자전거를 타고 있는 아이',
          value: 'play the piano',
          title: '피아노를 치다',
        },
        {
          src: '/LK4/C01/A02/EE4-LK4-C01-A02-P09-03.png',
          alt: '강아지를 산책시키고 있는 아이',
          value: 'walk my dog',
          title: '강아지를 산책시키다',
        },
        {
          src: '/LK4/C01/A02/EE4-LK4-C01-A02-P09-04.png',
          alt: '영화를 보고 있는 아이',
          value: 'watch movies',
          title: '영화를 보다',
        },
      ]}
      audioList={[
        { audioSrc: '/LK4/C01/A02/EE4-LK4-C01-A02-P09-01.mp3' },
        { audioSrc: '/LK4/C01/A02/EE4-LK4-C01-A02-P09-02.mp3' },
        { audioSrc: '/LK4/C01/A02/EE4-LK4-C01-A02-P09-03.mp3' },
        { audioSrc: '/LK4/C01/A02/EE4-LK4-C01-A02-P09-04.mp3' },
      ]}
      cardWidth={'598px'}
      cardHeight={'364px'}
    />
  );
};

export default P09;
