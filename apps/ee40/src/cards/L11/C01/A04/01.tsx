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
        { src: '/L11/C01/A04/EE4-L11-C01-A04-P01-01.png', alt: '‘월’ 글자 옆에 달', value: 'Monday', title: '월요일' },
        {
          src: '/L11/C01/A04/EE4-L11-C01-A04-P01-02.png',
          alt: '‘화’ 글자 옆에 달',
          value: 'Tuesday',
          title: '화요일',
        },
        { src: '/L11/C01/A04/EE4-L11-C01-A04-P01-03.png', alt: '‘수’ 글자 옆에 달', value: 'Wednesday', title: '수요일' },
        {
          src: '/L11/C01/A04/EE4-L11-C01-A04-P01-04.png',
          alt: '‘목’ 글자 옆에 달',
          value: 'Thurseday',
          title: '목요일',
        },
        {
          src: '/L11/C01/A04/EE4-L11-C01-A04-P01-05.png',
          alt: '‘금’ 글자 옆에 달',
          value: 'Friday',
          title: '금요일',
        },
        { src: '/L11/C01/A04/EE4-L11-C01-A04-P01-06.png', alt: '‘토’ 글자 옆에 달', value: 'Saturday', title: '토요일' },
        { src: '/L11/C01/A04/EE4-L11-C01-A04-P01-07.png', alt: '‘일’ 글자 옆에 달', value: 'Sunday', title: '일요일' },
      ]}
      audioList={[
        { audioSrc: '/L11/C01/A04/EE4-L11-C01-A04-P01-01.mp3' },
        { audioSrc: '/L11/C01/A04/EE4-L11-C01-A04-P01-02.mp3' },
        { audioSrc: '/L11/C01/A04/EE4-L11-C01-A04-P01-03.mp3' },
        { audioSrc: '/L11/C01/A04/EE4-L11-C01-A04-P01-04.mp3' },
        { audioSrc: '/L11/C01/A04/EE4-L11-C01-A04-P01-05.mp3' },
        { audioSrc: '/L11/C01/A04/EE4-L11-C01-A04-P01-06.mp3' },
        { audioSrc: '/L11/C01/A04/EE4-L11-C01-A04-P01-07.mp3' },
      ]}
      cardWidth={'598px'}
      cardHeight={'364px'}
    />
  );
};

export default P01;
