import EEL01C01A04P01 from '@/Pages/EEL01C01A04P01';

const P08 = () => {
  return (
    <EEL01C01A04P01
      headerInfo={{
        headerText: 'Words',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: 'Lesson 8에서 학습한 단어를 복습해 봅시다.',
      }}
      imageList={[
        { src: '/LK3/C01/A02/EE4-LK3-C01-A02-P08-01.png', alt: '장난감 배', value: 'boat', title: '배' },
        {
          src: '/LK3/C01/A02/EE4-LK3-C01-A02-P08-02.png',
          alt: '장난감 자동차',
          value: 'car',
          title: '자동차',
        },
        {
          src: '/LK3/C01/A02/EE4-LK3-C01-A02-P08-03.png',
          alt: '인형',
          value: 'doll',
          title: '인형',
        },
        {
          src: '/LK3/C01/A02/EE4-LK3-C01-A02-P08-04.png',
          alt: '야구 글러브',
          value: 'glove',
          title: '야구 글러브',
        },
        {
          src: '/LK3/C01/A02/EE4-LK3-C01-A02-P08-05.png',
          alt: '우산',
          value: 'umbrella',
          title: '우산',
        },
        {
          src: '/LK3/C01/A02/EE4-LK3-C01-A02-P08-06.png',
          alt: '손목시계',
          value: 'watch',
          title: '손목시계',
        },
      ]}
      audioList={[
        { audioSrc: '/LK3/C01/A02/EE4-LK3-C01-A02-P08-01.mp3' },
        { audioSrc: '/LK3/C01/A02/EE4-LK3-C01-A02-P08-02.mp3' },
        { audioSrc: '/LK3/C01/A02/EE4-LK3-C01-A02-P08-03.mp3' },
        { audioSrc: '/LK3/C01/A02/EE4-LK3-C01-A02-P08-04.mp3' },
        { audioSrc: '/LK3/C01/A02/EE4-LK3-C01-A02-P08-05.mp3' },
        { audioSrc: '/LK3/C01/A02/EE4-LK3-C01-A02-P08-06.mp3' },
      ]}
      cardWidth={'598px'}
      cardHeight={'364px'}
    />
  );
};

export default P08;
