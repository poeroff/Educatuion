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
        {
          src: '/SL1/C01/A03/EE4-SL1-C01-A03-P01-01.png',
          alt: '의자에 앉으려고 하는 아이, 아래로 향하는 화살표',
          value: 'Sit down.',
          title: '앉아.',
        },
        {
          src: '/SL1/C01/A03/EE4-SL1-C01-A03-P01-02.png',
          alt: '자리에 앉아 책을 펴고 읽고 있는 아이, 책을 펴는 방향을 나타내는 화살표',
          value: 'Open your books.',
          title: '책을 펴.',
        },
        {
          src: '/SL1/C01/A03/EE4-SL1-C01-A03-P01-03.png',
          alt: '자리에 앉아 책을 덮고 있는 아이, 책을 덮는 방향을 나타내는 화살표',
          value: 'Close your books.',
          title: '책을 덮어.',
        },
        {
          src: '/SL1/C01/A03/EE4-SL1-C01-A03-P01-04.png',
          alt: '자리에 앉아 손을 들고 있는 아이들, 위로 향하는 화살표',
          value: 'Hands up.',
          title: '손을 들어.',
        },
        {
          src: '/SL1/C01/A03/EE4-SL1-C01-A03-P01-05.png',
          alt: '자리에 앉아 손을 내리고 있는 아이들, 아래로 향하는 화살표',
          value: 'Hands down.',
          title: '손을 내려.',
        },
        { src: '/SL1/C01/A03/EE4-SL1-C01-A03-P01-06.png', alt: '의자에서 일어나는 아이, 위로 향하는 화살표', value: 'Stand up.', title: '일어나.' },
      ]}
      audioList={[
        { audioSrc: '/SL1/C01/A03/EE4-SL1-C01-A03-P01-01.mp3' },
        { audioSrc: '/SL1/C01/A03/EE4-SL1-C01-A03-P01-02.mp3' },
        { audioSrc: '/SL1/C01/A03/EE4-SL1-C01-A03-P01-03.mp3' },
        { audioSrc: '/SL1/C01/A03/EE4-SL1-C01-A03-P01-04.mp3' },
        { audioSrc: '/SL1/C01/A03/EE4-SL1-C01-A03-P01-05.mp3' },
        { audioSrc: '/SL1/C01/A03/EE4-SL1-C01-A03-P01-06.mp3' },
      ]}
      cardWidth={'454px'}
      cardHeight={'294px'}
    />
  );
};

export default P01;
