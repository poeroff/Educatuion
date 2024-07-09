import EEL01C01A04P01 from '@/Pages/EEL01C01A04P01';

const P09 = () => {
  return (
    <EEL01C01A04P01
      headerInfo={{
        headerText: 'Words',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: 'Lesson 9에서 학습한 단어를 복습해 봅시다.',
      }}
      imageList={[
        { src: '/LK3/C01/A02/EE4-LK3-C01-A02-P09-01.png', alt: '바구니 안에 놓여 있는 공과 그 공을 가리키는 화살표', value: 'in', title: '안에' },
        {
          src: '/LK3/C01/A02/EE4-LK3-C01-A02-P09-02.png',
          alt: '바구니',
          value: 'basket',
          title: '바구니',
        },
        {
          src: '/LK3/C01/A02/EE4-LK3-C01-A02-P09-03.png',
          alt: '책상 위에 놓여 있는 공과 그 공을 가리키는 화살표',
          value: 'on',
          title: '위에',
        },
        {
          src: '/LK3/C01/A02/EE4-LK3-C01-A02-P09-04.png',
          alt: '책상',
          value: 'desk',
          title: '책상',
        },
        {
          src: '/LK3/C01/A02/EE4-LK3-C01-A02-P09-05.png',
          alt: '테이블 아래에 놓여 있는 공과 그 공을 가리키는 화살표',
          value: 'under',
          title: '아래에',
        },
        {
          src: '/LK3/C01/A02/EE4-LK3-C01-A02-P09-06.png',
          alt: '테이블',
          value: 'table',
          title: '탁자',
        },
      ]}
      audioList={[
        { audioSrc: '/LK3/C01/A02/EE4-LK3-C01-A02-P09-01.mp3' },
        { audioSrc: '/LK3/C01/A02/EE4-LK3-C01-A02-P09-02.mp3' },
        { audioSrc: '/LK3/C01/A02/EE4-LK3-C01-A02-P09-03.mp3' },
        { audioSrc: '/LK3/C01/A02/EE4-LK3-C01-A02-P09-04.mp3' },
        { audioSrc: '/LK3/C01/A02/EE4-LK3-C01-A02-P09-05.mp3' },
        { audioSrc: '/LK3/C01/A02/EE4-LK3-C01-A02-P09-06.mp3' },
      ]}
      cardWidth={'598px'}
      cardHeight={'364px'}
    />
  );
};

export default P09;
