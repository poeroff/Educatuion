import EEL01C01A04P01 from '@/Pages/EEL01C01A04P01';

const P08 = () => {
  return (
    <EEL01C01A04P01
      headerInfo={{
        headerText: 'Words',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: 'Lesson 2에서 학습한 단어를 복습해 봅시다.',
      }}
      imageList={[
        { src: '/LK1/C01/A02/EE4-LK1-C01-A02-P08-01.png', alt: '엄마', value: 'mom', title: '엄마' },
        {
          src: '/LK1/C01/A02/EE4-LK1-C01-A02-P08-02.png',
          alt: '아빠',
          value: 'dad',
          title: '아빠',
        },
        {
          src: '/LK1/C01/A02/EE4-LK1-C01-A02-P08-03.png',
          alt: '여자 형제',
          value: 'sister',
          title: '여자 형제',
        },
        {
          src: '/LK1/C01/A02/EE4-LK1-C01-A02-P08-04.png',
          alt: '남자 형제',
          value: 'brother',
          title: '남자 형제',
        },
        {
          src: '/LK1/C01/A02/EE4-LK1-C01-A02-P08-04.png',
          alt: '가방에 달린 이름표',
          value: 'name',
          title: '가방에 달린 이름표',
        },
      ]}
      audioList={[
        { audioSrc: '/LK1/C01/A02/EE4-LK1-C01-A02-P08-01.mp3' },
        { audioSrc: '/LK1/C01/A02/EE4-LK1-C01-A02-P08-02.mp3' },
        { audioSrc: '/LK1/C01/A02/EE4-LK1-C01-A02-P08-03.mp3' },
        { audioSrc: '/LK1/C01/A02/EE4-LK1-C01-A02-P08-04.mp3' },
        { audioSrc: '/LK1/C01/A02/EE4-LK1-C01-A02-P08-05.mp3' },
      ]}
      cardWidth={'598px'}
      cardHeight={'364px'}
    />
  );
};

export default P08;
