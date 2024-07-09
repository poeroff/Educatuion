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
        { src: '/L08/C01/A04/EE4-L08-C01-A04-P01-01.jpg', alt: '배', value: 'boat', title: '배' },
        {
          src: '/L08/C01/A04/EE4-L08-C01-A04-P01-02.jpg',
          alt: '자동차',
          value: 'car',
          title: '자동차',
        },
        { src: '/L08/C01/A04/EE4-L08-C01-A04-P01-03.jpg', alt: '인형', value: 'doll', title: '인형' },
        {
          src: '/L08/C01/A04/EE4-L08-C01-A04-P01-04.jpg',
          alt: '야구 글러브',
          value: 'glove',
          title: '야구 글러브',
        },
        {
          src: '/L08/C01/A04/EE4-L08-C01-A04-P01-05.jpg',
          alt: '우산',
          value: 'umbrella',
          title: '우산',
        },
        { src: '/L08/C01/A04/EE4-L08-C01-A04-P01-06.jpg', alt: '손목시계', value: 'watch', title: '손목시계' },
      ]}
      audioList={[
        { audioSrc: '/L08/C01/A04/EE4-L08-C01-A04-P01-01.mp3' },
        { audioSrc: '/L08/C01/A04/EE4-L08-C01-A04-P01-02.mp3' },
        { audioSrc: '/L08/C01/A04/EE4-L08-C01-A04-P01-03.mp3' },
        { audioSrc: '/L08/C01/A04/EE4-L08-C01-A04-P01-04.mp3' },
        { audioSrc: '/L08/C01/A04/EE4-L08-C01-A04-P01-05.mp3' },
        { audioSrc: '/L08/C01/A04/EE4-L08-C01-A04-P01-06.mp3' },
      ]}
      cardWidth={'598px'}
      cardHeight={'364px'}
    />
  );
};

export default P01;
