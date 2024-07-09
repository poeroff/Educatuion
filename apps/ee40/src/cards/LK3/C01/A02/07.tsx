import EEL01C01A04P01 from '@/Pages/EEL01C01A04P01';

const P07 = () => {
  return (
    <EEL01C01A04P01
      headerInfo={{
        headerText: 'Words',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: 'Lesson 7에서 학습한 단어를 복습해 봅시다.',
      }}
      imageList={[
        { src: '/LK3/C01/A02/EE4-LK3-C01-A02-P07-01.png', alt: '시계', value: 'time', title: '시간' },
        {
          src: '/LK3/C01/A02/EE4-LK3-C01-A02-P07-02.png',
          alt: '해가 떠오르는 풍경, 7시를 가리키는 시계, 토스트와 우유가 올려져 있는 식탁',
          value: 'breakfast',
          title: '아침 식사',
        },
        {
          src: '/LK3/C01/A02/EE4-LK3-C01-A02-P07-03.png',
          alt: '학교',
          value: 'school',
          title: '학교',
        },
        {
          src: '/LK3/C01/A02/EE4-LK3-C01-A02-P07-04.png',
          alt: '해가 하늘 높이 있는 풍경, 12시를 가리키는 시계, 식판이 올려져 있는 식탁',
          value: 'lunch',
          title: '점심 식사',
        },
        {
          src: '/LK3/C01/A02/EE4-LK3-C01-A02-P07-05.png',
          alt: '해가 저무는 풍경, 6시를 가리키는 시계, 밥, 국, 반찬, 생선구이가 올려져 있는 식탁',
          value: 'dinner',
          title: '저녁 식사',
        },
        {
          src: '/LK3/C01/A02/EE4-LK3-C01-A02-P07-06.png',
          alt: '침대와 협탁, 시계',
          value: 'bed',
          title: '침대',
        },
      ]}
      audioList={[
        { audioSrc: '/LK3/C01/A02/EE4-LK3-C01-A02-P07-01.mp3' },
        { audioSrc: '/LK3/C01/A02/EE4-LK3-C01-A02-P07-02.mp3' },
        { audioSrc: '/LK3/C01/A02/EE4-LK3-C01-A02-P07-03.mp3' },
        { audioSrc: '/LK3/C01/A02/EE4-LK3-C01-A02-P07-04.mp3' },
        { audioSrc: '/LK3/C01/A02/EE4-LK3-C01-A02-P07-05.mp3' },
        { audioSrc: '/LK3/C01/A02/EE4-LK3-C01-A02-P07-06.mp3' },
      ]}
      cardWidth={'598px'}
      cardHeight={'364px'}
    />
  );
};

export default P07;
