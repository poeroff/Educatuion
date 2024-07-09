import EEL01C01A04P01 from '@/Pages/EEL01C01A04P01';

const P09 = () => {
  return (
    <EEL01C01A04P01
      headerInfo={{
        headerText: 'Words',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: 'Lesson 3에서 학습한 단어를 복습해 봅시다.',
      }}
      imageList={[
        { src: '/LK1/C01/A02/EE4-LK1-C01-A02-P09-01.png', alt: '할아버지', value: 'grandpa', title: '할아버지' },
        {
          src: '/LK1/C01/A02/EE4-LK1-C01-A02-P09-02.png',
          alt: '할머니',
          value: 'grandma',
          title: '할머니',
        },
        {
          src: '/LK1/C01/A02/EE4-LK1-C01-A02-P09-03.png',
          alt: '여자아이에게 어깨동무하고 있는 남자아이와 그 여자아이를 가리키고 있는 화살표',
          value: 'friend',
          title: '여자아이에게 어깨동무하고 있는 남자아이와 그 여자아이를 가리키고 있는 화살표',
        },
        {
          src: '/LK1/C01/A02/EE4-LK1-C01-A02-P09-04.png',
          alt: '선생님',
          value: 'teacher',
          title: '선생님',
        },
        {
          src: '/LK1/C01/A02/EE4-LK1-C01-A02-P09-04.png',
          alt: '선글라스를 낀 채  멋진 표정을 하고 있는 아이',
          value: 'cool',
          title: '멋진',
        },
        {
          src: '/LK1/C01/A02/EE4-LK1-C01-A02-P09-04.png',
          alt: '아기',
          value: 'cute',
          title: '귀여운',
        },
        {
          src: '/LK1/C01/A02/EE4-LK1-C01-A02-P09-04.png',
          alt: '키가 다른 두 여자아이, 키가 큰 여자아이를 가리키고 있는 화살표',
          value: 'tall',
          title: '키가 큰',
        },
      ]}
      audioList={[
        { audioSrc: '/LK1/C01/A02/EE4-LK1-C01-A02-P09-01.mp3' },
        { audioSrc: '/LK1/C01/A02/EE4-LK1-C01-A02-P09-02.mp3' },
        { audioSrc: '/LK1/C01/A02/EE4-LK1-C01-A02-P09-03.mp3' },
        { audioSrc: '/LK1/C01/A02/EE4-LK1-C01-A02-P09-04.mp3' },
        { audioSrc: '/LK1/C01/A02/EE4-LK1-C01-A02-P09-05.mp3' },
      ]}
      cardWidth={'598px'}
      cardHeight={'364px'}
    />
  );
};

export default P09;
