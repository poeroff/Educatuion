import EEL01C01A04P01 from '@/Pages/EEL01C01A04P01';

const P09 = () => {
  return (
    <EEL01C01A04P01
      headerInfo={{
        headerText: 'Words',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: 'Lesson 6에서 학습한 단어를 복습해 봅시다.',
      }}
      imageList={[
        { src: '/LK2/C01/A02/EE4-LK2-C01-A02-P09-01.png', alt: '빗자루와 쓰레받기로 청소하고 있는 아이', value: 'clean', title: '청소하다' },
        {
          src: '/LK2/C01/A02/EE4-LK2-C01-A02-P09-02.png',
          alt: '요리하고 있는 아이',
          value: 'cook',
          title: '요리하다',
        },
        {
          src: '/LK2/C01/A02/EE4-LK2-C01-A02-P09-03.png',
          alt: '그림을 그리고 있는 아이',
          value: 'draw',
          title: '그리다',
        },
        {
          src: '/LK2/C01/A02/EE4-LK2-C01-A02-P09-04.png',
          alt: '음악을 듣고 있는 아이',
          value: 'listen',
          title: '듣다',
        },
        {
          src: '/LK2/C01/A02/EE4-LK2-C01-A02-P09-05.png',
          alt: '로봇을 만들고 있는 아이',
          value: 'make',
          title: '만들다',
        },
        {
          src: '/LK2/C01/A02/EE4-LK2-C01-A02-P09-06.png',
          alt: '책을 읽고 있는 아이',
          value: 'read',
          title: '읽다',
        },
      ]}
      audioList={[
        { audioSrc: '/LK2/C01/A02/EE4-LK2-C01-A02-P09-01.mp3' },
        { audioSrc: '/LK2/C01/A02/EE4-LK2-C01-A02-P09-02.mp3' },
        { audioSrc: '/LK2/C01/A02/EE4-LK2-C01-A02-P09-03.mp3' },
        { audioSrc: '/LK2/C01/A02/EE4-LK2-C01-A02-P09-04.mp3' },
        { audioSrc: '/LK2/C01/A02/EE4-LK2-C01-A02-P09-05.mp3' },
        { audioSrc: '/LK2/C01/A02/EE4-LK2-C01-A02-P09-06.mp3' },
      ]}
      cardWidth={'598px'}
      cardHeight={'364px'}
    />
  );
};

export default P09;
