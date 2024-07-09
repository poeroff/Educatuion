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
        { src: '/L10/C01/A04/EE4-L10-C01-A04-P01-01.png', alt: '모자', value: 'cap', title: '모자' },
        {
          src: '/L10/C01/A04/EE4-L10-C01-A04-P01-02.png',
          alt: '코트',
          value: 'coat',
          title: '코트',
        },
        { src: '/L10/C01/A04/EE4-L10-C01-A04-P01-03.png', alt: '드레스', value: 'dress', title: '드레스' },
        {
          src: '/L10/C01/A04/EE4-L10-C01-A04-P01-04.png',
          alt: '스카프',
          value: 'scarf',
          title: '스카프',
        },
        {
          src: '/L10/C01/A04/EE4-L10-C01-A04-P01-05.png',
          alt: '셔츠',
          value: 'shirt',
          title: '셔츠',
        },
        { src: '/L10/C01/A04/EE4-L10-C01-A04-P01-06.png', alt: '빨간 리본이 달린 신발', value: 'shoe', title: '신발' },
        { src: '/L10/C01/A04/EE4-L10-C01-A04-P01-07.png', alt: '치마', value: 'skirt', title: '치마' },
        { src: '/L10/C01/A04/EE4-L10-C01-A04-P01-08.png', alt: '긴 초록색 연필과 짧은 빨간색 연필', value: 'long / short', title: '긴 / 짧은' },
      ]}
      audioList={[
        { audioSrc: '/L10/C01/A04/EE4-L10-C01-A04-P01-01.mp3' },
        { audioSrc: '/L10/C01/A04/EE4-L10-C01-A04-P01-02.mp3' },
        { audioSrc: '/L10/C01/A04/EE4-L10-C01-A04-P01-03.mp3' },
        { audioSrc: '/L10/C01/A04/EE4-L10-C01-A04-P01-04.mp3' },
        { audioSrc: '/L10/C01/A04/EE4-L10-C01-A04-P01-05.mp3' },
        { audioSrc: '/L10/C01/A04/EE4-L10-C01-A04-P01-06.mp3' },
        { audioSrc: '/L10/C01/A04/EE4-L10-C01-A04-P01-07.mp3' },
        { audioSrc: '/L10/C01/A04/EE4-L10-C01-A04-P01-08.mp3' },
      ]}
      cardWidth={'598px'}
      cardHeight={'364px'}
    />
  );
};

export default P01;
