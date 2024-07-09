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
        { src: '/L01/C01/A04/EE4-L01-C01-A04-P01-01.png', alt: '여자 아이가 엄지 손가락을 올리고 웃고 있는 모습', value: 'good', title: '좋은' },
        {
          src: '/L01/C01/A04/EE4-L01-C01-A04-P01-02.png',
          alt: '여자 아이가 양손의 엄지 손가락을 올리고 활짝 웃고 있는 모습',
          value: 'great',
          title: '아주 좋은',
        },
        { src: '/L01/C01/A04/EE4-L01-C01-A04-P01-03.png', alt: '해가 떠오르고 있는 모습', value: 'morning', title: '아침\n(오전)' },
        { src: '/L01/C01/A04/EE4-L01-C01-A04-P01-04.png', alt: '해가 높이 떠 있는 모습', value: 'afternoon', title: '오후' },
        { src: '/L01/C01/A04/EE4-L01-C01-A04-P01-05.png', alt: '해가 지고 있는 모습', value: 'evening', title: '저녁' },
      ]}
      audioList={[
        { audioSrc: '/L01/C01/A04/EE4-L01-C01-A04-P01-01.mp3' },
        { audioSrc: '/L01/C01/A04/EE4-L01-C01-A04-P01-02.mp3' },
        { audioSrc: '/L01/C01/A04/EE4-L01-C01-A04-P01-03.mp3' },
        { audioSrc: '/L01/C01/A04/EE4-L01-C01-A04-P01-04.mp3' },
        { audioSrc: '/L01/C01/A04/EE4-L01-C01-A04-P01-05.mp3' },
      ]}
      cardWidth={'454px'}
      cardHeight={'294px'}
    />
  );
};

export default P01;
