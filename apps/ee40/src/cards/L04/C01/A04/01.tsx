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
        { src: '/L04/C01/A04/EE4-L04-C01-A04-P01-01.png', alt: '떡꼬치를 먹고 있는 남자 아이의 모습', value: 'eat', title: '먹다' },
        {
          src: '/L04/C01/A04/EE4-L04-C01-A04-P01-02.png',
          alt: '문으로 들어가고 있는 사람의 모습',
          value: 'enter',
          title: '들어가다',
        },
        { src: '/L04/C01/A04/EE4-L04-C01-A04-P01-03.png', alt: '벽을 밀고 있는 사람의 모습', value: 'push', title: '밀다' },
        { src: '/L04/C01/A04/EE4-L04-C01-A04-P01-04.png', alt: '학교 앞에서 달리고 있는 여학생의 모습', value: 'run', title: '달리다' },
        { src: '/L04/C01/A04/EE4-L04-C01-A04-P01-05.png', alt: '대화를 하고 있는 두 학생의 모습', value: 'talk', title: '말하다' },
      ]}
      audioList={[
        { audioSrc: '/L04/C01/A04/EE4-L04-C01-A04-P01-01.mp3' },
        { audioSrc: '/L04/C01/A04/EE4-L04-C01-A04-P01-02.mp3' },
        { audioSrc: '/L04/C01/A04/EE4-L04-C01-A04-P01-03.mp3' },
        { audioSrc: '/L04/C01/A04/EE4-L04-C01-A04-P01-04.mp3' },
        { audioSrc: '/L04/C01/A04/EE4-L04-C01-A04-P01-05.mp3' },
      ]}
      cardWidth={'598px'}
      cardHeight={'364px'}
    />
  );
};

export default P01;
