import EEL01C01A04P01 from '@/Pages/EEL01C01A04P01';

const P01 = () => {
  return (
    <EEL01C01A04P01
      headerInfo={{
        headerText: 'Words',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: '단어 카드를 클릭해 뜻을 확인해 봅시다.',
      }}
      imageList={[
        { src: '/L05/C01/A04/EE4-L05-C01-A04-P01-01.jpg', alt: '배드민턴을 치고 있는 남자아이의 모습', value: 'badminton', title: '배드민턴' },
        {
          src: '/L05/C01/A04/EE4-L05-C01-A04-P01-02.jpg',
          alt: '야구를 하는 여자아이의 모습',
          value: 'baseball',
          title: '야구',
        },
        { src: '/L05/C01/A04/EE4-L05-C01-A04-P01-03.jpg', alt: '농구를 하고 있는 남자아이의 모습', value: 'basketball', title: '농구' },
        { src: '/L05/C01/A04/EE4-L05-C01-A04-P01-04.jpg', alt: '축구를 하는 여자아이의 모습', value: 'soccer', title: '축구' },
        { src: '/L05/C01/A04/EE4-L05-C01-A04-P01-05.jpg', alt: '노트북을 하며 통화를 하는 사람의 모습', value: 'busy', title: '바쁜' },
        { src: '/L05/C01/A04/EE4-L05-C01-A04-P01-06.jpg', alt: '이불을 덮고 이마에 얼음 찜질을 하고 있는 사람의 모습', value: 'sick', title: '아픈' },
      ]}
      audioList={[
        { audioSrc: '/L05/C01/A04/EE4-L05-C01-A04-P01-01.mp3' },
        { audioSrc: '/L05/C01/A04/EE4-L05-C01-A04-P01-02.mp3' },
        { audioSrc: '/L05/C01/A04/EE4-L05-C01-A04-P01-03.mp3' },
        { audioSrc: '/L05/C01/A04/EE4-L05-C01-A04-P01-04.mp3' },
        { audioSrc: '/L05/C01/A04/EE4-L05-C01-A04-P01-05.mp3' },
        { audioSrc: '/L05/C01/A04/EE4-L05-C01-A04-P01-06.mp3' },
      ]}
      cardWidth={'598px'}
      cardHeight={'364px'}
    />
  );
};

export default P01;
