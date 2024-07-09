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
        { src: '/L03/C01/A04/EE4-L03-C01-A04-P01-01.JPG', alt: '할머니가 웃고 있는 모습', value: 'grandma', title: '할머니' },
        {
          src: '/L03/C01/A04/EE4-L03-C01-A04-P01-02.JPG',
          alt: '안경과 모자를 쓴 할아버지가 미소 짓고 있는 모습',
          value: 'grandpa',
          title: '할아버지',
        },
        { src: '/L03/C01/A04/EE4-L03-C01-A04-P01-03.JPG', alt: '두 친구가 어깨동무하고 있는 모습', value: 'friend', title: '친구' },
        { src: '/L03/C01/A04/EE4-L03-C01-A04-P01-04.JPG', alt: '책과 펜을 들고 있는 선생님의 모습', value: 'teacher', title: '선생님' },
        { src: '/L03/C01/A04/EE4-L03-C01-A04-P01-05.JPG', alt: '선글라스를 낀 멋진 사람', value: 'cool', title: '멋진' },
        { src: '/L03/C01/A04/EE4-L03-C01-A04-P01-06.JPG', alt: '귀여운 아기', value: 'cute', title: '귀여운' },
        {
          src: '/L03/C01/A04/EE4-L03-C01-A04-P01-07.JPG',
          alt: '키가 다른 두 아이가 서 있고 키가 큰 아이를 가리키는 화살표 표시',
          value: 'tall',
          title: '키가 큰',
        },
      ]}
      audioList={[
        { audioSrc: '/L03/C01/A04/EE4-L03-C01-A04-P01-01.mp3' },
        { audioSrc: '/L03/C01/A04/EE4-L03-C01-A04-P01-02.mp3' },
        { audioSrc: '/L03/C01/A04/EE4-L03-C01-A04-P01-03.mp3' },
        { audioSrc: '/L03/C01/A04/EE4-L03-C01-A04-P01-04.mp3' },
        { audioSrc: '/L03/C01/A04/EE4-L03-C01-A04-P01-05.mp3' },
        { audioSrc: '/L03/C01/A04/EE4-L03-C01-A04-P01-06.mp3' },
        { audioSrc: '/L03/C01/A04/EE4-L03-C01-A04-P01-07.mp3' },
      ]}
      cardWidth={'598px'}
      cardHeight={'364px'}
    />
  );
};

export default P01;
