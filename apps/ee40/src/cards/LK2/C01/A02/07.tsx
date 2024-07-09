import EEL01C01A04P01 from '@/Pages/EEL01C01A04P01';

const P07 = () => {
  return (
    <EEL01C01A04P01
      headerInfo={{
        headerText: 'Words',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: 'Lesson 4에서 학습한 단어를 복습해 봅시다.',
      }}
      imageList={[
        { src: '/LK2/C01/A02/EE4-LK2-C01-A02-P07-01.png', alt: '떡꼬치를 먹고 있는 아이', value: 'eat', title: '먹다' },
        {
          src: '/LK2/C01/A02/EE4-LK2-C01-A02-P07-02.png',
          alt: '방에 들어가는 아이',
          value: 'enter',
          title: '들어가다',
        },
        {
          src: '/LK2/C01/A02/EE4-LK2-C01-A02-P07-03.png',
          alt: '벽을 밀고 있는 아이',
          value: 'push',
          title: '밀다',
        },
        {
          src: '/LK2/C01/A02/EE4-LK2-C01-A02-P07-04.png',
          alt: '운동장에서 달리고 있는 아이',
          value: 'run',
          title: '달리다',
        },
        {
          src: '/LK2/C01/A02/EE4-LK2-C01-A02-P07-05.png',
          alt: '이야기를 나누고 있는 아이들',
          value: 'talk',
          title: '말하다',
        },
      ]}
      audioList={[
        { audioSrc: '/LK2/C01/A02/EE4-LK2-C01-A02-P07-01.mp3' },
        { audioSrc: '/LK2/C01/A02/EE4-LK2-C01-A02-P07-02.mp3' },
        { audioSrc: '/LK2/C01/A02/EE4-LK2-C01-A02-P07-03.mp3' },
        { audioSrc: '/LK2/C01/A02/EE4-LK2-C01-A02-P07-04.mp3' },
        { audioSrc: '/LK2/C01/A02/EE4-LK2-C01-A02-P07-05.mp3' },
      ]}
      cardWidth={'598px'}
      cardHeight={'364px'}
    />
  );
};

export default P07;
