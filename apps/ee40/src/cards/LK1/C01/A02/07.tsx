import EEL01C01A04P01 from '@/Pages/EEL01C01A04P01';

const P07 = () => {
  return (
    <EEL01C01A04P01
      headerInfo={{
        headerText: 'Words',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: 'Lesson 1에서 학습한 단어를 복습해 봅시다.',
      }}
      imageList={[
        { src: '/LK1/C01/A02/EE4-LK1-C01-A02-P07-01.png', alt: '한 손의 엄지를 세우며 웃고 있는 아이', value: 'good', title: '좋은' },
        {
          src: '/LK1/C01/A02/EE4-LK1-C01-A02-P07-02.png',
          alt: '양 손의 엄지를 세우며 활짝 웃고 있는 아이',
          value: 'great',
          title: '아주 좋은',
        },
        {
          src: '/LK1/C01/A02/EE4-LK1-C01-A02-P07-03.png',
          alt: '해가 뜨고 있는 모습',
          value: 'morning',
          title: '아침(오전)',
        },
        {
          src: '/LK1/C01/A02/EE4-LK1-C01-A02-P07-04.png',
          alt: '해가 하늘 높이 떠 있는 모습',
          value: 'afternoon',
          title: '오후',
        },
        {
          src: '/LK1/C01/A02/EE4-LK1-C01-A02-P07-05.png',
          alt: '해가 저물고 있는 모습',
          value: 'evening',
          title: '저녁',
        },
      ]}
      audioList={[
        { audioSrc: '/LK1/C01/A02/EE4-LK1-C01-A02-P07-01.mp3' },
        { audioSrc: '/LK1/C01/A02/EE4-LK1-C01-A02-P07-02.mp3' },
        { audioSrc: '/LK1/C01/A02/EE4-LK1-C01-A02-P07-03.mp3' },
        { audioSrc: '/LK1/C01/A02/EE4-LK1-C01-A02-P07-04.mp3' },
        { audioSrc: '/LK1/C01/A02/EE4-LK1-C01-A02-P07-05.mp3' },
      ]}
      cardWidth={'598px'}
      cardHeight={'364px'}
    />
  );
};

export default P07;
