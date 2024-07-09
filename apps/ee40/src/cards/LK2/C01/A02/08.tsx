import EEL01C01A04P01 from '@/Pages/EEL01C01A04P01';

const P08 = () => {
  return (
    <EEL01C01A04P01
      headerInfo={{
        headerText: 'Words',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: 'Lesson 5에서 학습한 단어를 복습해 봅시다.',
      }}
      imageList={[
        { src: '/LK2/C01/A02/EE4-LK2-C01-A02-P08-01.png', alt: '배드민턴을 하고 있는 아이', value: 'badminton', title: '배드민턴' },
        {
          src: '/LK2/C01/A02/EE4-LK2-C01-A02-P08-02.png',
          alt: '야구를 하고 있는 아이',
          value: 'baseball',
          title: '야구',
        },
        {
          src: '/LK2/C01/A02/EE4-LK2-C01-A02-P08-03.png',
          alt: '농구를 하고 있는 아이',
          value: 'basketball',
          title: '농구',
        },
        {
          src: '/LK2/C01/A02/EE4-LK2-C01-A02-P08-04.png',
          alt: '축구를 하고 있는 아이',
          value: 'soccer',
          title: '축구',
        },
        {
          src: '/LK2/C01/A02/EE4-LK2-C01-A02-P08-05.png',
          alt: '전화를 받으며 바쁘게 일을 하고 있는 사람',
          value: 'busy',
          title: '바쁜',
        },
        {
          src: '/LK2/C01/A02/EE4-LK2-C01-A02-P08-06.png',
          alt: '이불을 덮고 얼음을 머리에 올리고 아파하고 있는 아이',
          value: 'sick',
          title: '아픈',
        },
      ]}
      audioList={[
        { audioSrc: '/LK2/C01/A02/EE4-LK2-C01-A02-P08-01.mp3' },
        { audioSrc: '/LK2/C01/A02/EE4-LK2-C01-A02-P08-02.mp3' },
        { audioSrc: '/LK2/C01/A02/EE4-LK2-C01-A02-P08-03.mp3' },
        { audioSrc: '/LK2/C01/A02/EE4-LK2-C01-A02-P08-04.mp3' },
        { audioSrc: '/LK2/C01/A02/EE4-LK2-C01-A02-P08-05.mp3' },
        { audioSrc: '/LK2/C01/A02/EE4-LK2-C01-A02-P08-06.mp3' },
      ]}
      cardWidth={'598px'}
      cardHeight={'364px'}
    />
  );
};

export default P08;
