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
        { src: '/L06/C01/A04/EE4-L06-C01-A04-P01-01.jpg', alt: '바닥을 쓸고 있는 남자아이의 모습', value: 'clean', title: '청소하다' },
        {
          src: '/L06/C01/A04/EE4-L06-C01-A04-P01-02.jpg',
          alt: '요리를 하는 사람의 모습',
          value: 'cook',
          title: '요리하다',
        },
        { src: '/L06/C01/A04/EE4-L06-C01-A04-P01-03.jpg', alt: '그림을 그리고 있는 여자아이의 모습', value: 'draw', title: '그리다' },
        { src: '/L06/C01/A04/EE4-L06-C01-A04-P01-04.jpg', alt: '헤드폰으로 노래를 듣는 남자아이의 모습', value: 'listen', title: '듣다' },
        { src: '/L06/C01/A04/EE4-L06-C01-A04-P01-05.jpg', alt: '로봇을 조립하는 여자아이의 모습', value: 'make', title: '만들다' },
        { src: '/L06/C01/A04/EE4-L06-C01-A04-P01-06.jpg', alt: '책을 읽는 아이의 모습', value: 'read', title: '읽다' },
      ]}
      audioList={[
        { audioSrc: '/L06/C01/A04/EE4-L06-C01-A04-P01-01.mp3' },
        { audioSrc: '/L06/C01/A04/EE4-L06-C01-A04-P01-02.mp3' },
        { audioSrc: '/L06/C01/A04/EE4-L06-C01-A04-P01-03.mp3' },
        { audioSrc: '/L06/C01/A04/EE4-L06-C01-A04-P01-04.mp3' },
        { audioSrc: '/L06/C01/A04/EE4-L06-C01-A04-P01-05.mp3' },
        { audioSrc: '/L06/C01/A04/EE4-L06-C01-A04-P01-06.mp3' },
      ]}
      cardWidth={'598px'}
      cardHeight={'364px'}
    />
  );
};

export default P01;
