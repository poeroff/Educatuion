import EEL01C01A04P01 from '@/Pages/EEL01C01A04P01';

const P07 = () => {
  return (
    <EEL01C01A04P01
      headerInfo={{
        headerText: 'Words',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: 'Lesson 10에서 학습한 단어를 복습해 봅시다.',
      }}
      imageList={[
        { src: '/LK4/C01/A02/EE4-LK4-C01-A02-P07-01.png', alt: '모자', value: 'cap', title: '모자' },
        {
          src: '/LK4/C01/A02/EE4-LK4-C01-A02-P07-02.png',
          alt: '코트',
          value: 'coat',
          title: '코트',
        },
        {
          src: '/LK4/C01/A02/EE4-LK4-C01-A02-P07-03.png',
          alt: '드레스',
          value: 'dress',
          title: '드레스',
        },
        {
          src: '/LK4/C01/A02/EE4-LK4-C01-A02-P07-04.png',
          alt: '스카프',
          value: 'scarf',
          title: '스카프',
        },
        {
          src: '/LK4/C01/A02/EE4-LK4-C01-A02-P07-05.png',
          alt: '셔츠',
          value: 'shirt',
          title: '셔츠',
        },
        {
          src: '/LK4/C01/A02/EE4-LK4-C01-A02-P07-06.png',
          alt: '신발 한 짝',
          value: 'shoe',
          title: '신발',
        },
        {
          src: '/LK4/C01/A02/EE4-LK4-C01-A02-P07-07.png',
          alt: '치마',
          value: 'skirt',
          title: '치마',
        },
        {
          src: '/LK4/C01/A02/EE4-LK4-C01-A02-P07-08.png',
          alt: '길이가 다른 두 연필과 길이가 긴 연필을 가리키는 화살표',
          value: 'long',
          title: '긴',
        },
        {
          src: '/LK4/C01/A02/EE4-LK4-C01-A02-P07-09.png',
          alt: '길이가 다른 두 연필과 길이가 짧은 연필을 가리키는 화살표',
          value: 'short',
          title: '짧은',
        },
      ]}
      audioList={[
        { audioSrc: '/LK4/C01/A02/EE4-LK4-C01-A02-P07-01.mp3' },
        { audioSrc: '/LK4/C01/A02/EE4-LK4-C01-A02-P07-02.mp3' },
        { audioSrc: '/LK4/C01/A02/EE4-LK4-C01-A02-P07-03.mp3' },
        { audioSrc: '/LK4/C01/A02/EE4-LK4-C01-A02-P07-04.mp3' },
        { audioSrc: '/LK4/C01/A02/EE4-LK4-C01-A02-P07-05.mp3' },
        { audioSrc: '/LK4/C01/A02/EE4-LK4-C01-A02-P07-06.mp3' },
        { audioSrc: '/LK4/C01/A02/EE4-LK4-C01-A02-P07-07.mp3' },
        { audioSrc: '/LK4/C01/A02/EE4-LK4-C01-A02-P07-08.mp3' },
        { audioSrc: '/LK4/C01/A02/EE4-LK4-C01-A02-P07-09.mp3' },
      ]}
      cardWidth={'598px'}
      cardHeight={'364px'}
    />
  );
};

export default P07;
