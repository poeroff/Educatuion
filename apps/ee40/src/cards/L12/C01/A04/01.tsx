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
        { src: '/L12/C01/A04/EE4-L12-C01-A04-P01-01.png', alt: '피아노를 치고 있는 사람의 모습', value: 'play the piano', title: '피아노를 치다' },
        {
          src: '/L12/C01/A04/EE4-L12-C01-A04-P01-02.png',
          alt: '공원에서 자전거를 타고 있는 아이의 모습',
          value: 'ride my bike',
          title: '자전거를 타다',
        },
        {
          src: '/L12/C01/A04/EE4-L12-C01-A04-P01-03.png',
          alt: '강아지를 산책시키는 사람의 모습',
          value: 'walk my dog',
          title: '강아지를 산책시키다',
        },
        {
          src: '/L12/C01/A04/EE4-L12-C01-A04-P01-04.png',
          alt: '영화를 보는 사람의 모습',
          value: 'watch movies',
          title: '영화를 보다',
        },
      ]}
      audioList={[
        { audioSrc: '/L12/C01/A04/EE4-L12-C01-A04-P01-01.mp3' },
        { audioSrc: '/L12/C01/A04/EE4-L12-C01-A04-P01-02.mp3' },
        { audioSrc: '/L12/C01/A04/EE4-L12-C01-A04-P01-03.mp3' },
        { audioSrc: '/L12/C01/A04/EE4-L12-C01-A04-P01-04.mp3' },
      ]}
      cardWidth={'598px'}
      cardHeight={'364px'}
    />
  );
};

export default P01;
