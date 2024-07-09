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
        { src: '/L07/C01/A04/EE4-L07-C01-A04-P01-01.JPG', alt: '알람 시계', value: 'time', title: '시간' },
        {
          src: '/L07/C01/A04/EE4-L07-C01-A04-P01-02.JPG',
          alt: '해가 뜨고 있는 창 밖, 7시를 가리키는 시계, 간단한 식사가 차려진 밥상',
          value: 'breakfast',
          title: '아침 식사',
        },
        { src: '/L07/C01/A04/EE4-L07-C01-A04-P01-03.JPG', alt: '학교', value: 'school', title: '학교' },
        {
          src: '/L07/C01/A04/EE4-L07-C01-A04-P01-04.JPG',
          alt: '해가 높이 떠 있는 창 밖, 12시를 가리키는 시계, 음식이 담긴 식판',
          value: 'lunch',
          title: '점심 식사',
        },
        {
          src: '/L07/C01/A04/EE4-L07-C01-A04-P01-05.JPG',
          alt: '해가 저물어 노을이 지는 창 밖, 6시를 가리키는 시계, 식사가 차려진 밥상',
          value: 'dinner',
          title: '저녁 식사',
        },
        { src: '/L07/C01/A04/EE4-L07-C01-A04-P01-06.JPG', alt: '침대와 알람 시계', value: 'bed', title: '침대' },
      ]}
      audioList={[
        { audioSrc: '/L07/C01/A04/EE4-L07-C01-A04-P01-01.mp3' },
        { audioSrc: '/L07/C01/A04/EE4-L07-C01-A04-P01-02.mp3' },
        { audioSrc: '/L07/C01/A04/EE4-L07-C01-A04-P01-03.mp3' },
        { audioSrc: '/L07/C01/A04/EE4-L07-C01-A04-P01-04.mp3' },
        { audioSrc: '/L07/C01/A04/EE4-L07-C01-A04-P01-05.mp3' },
        { audioSrc: '/L07/C01/A04/EE4-L07-C01-A04-P01-06.mp3' },
      ]}
      cardWidth={'598px'}
      cardHeight={'364px'}
    />
  );
};

export default P01;
