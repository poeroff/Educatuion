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
        { src: '/L09/C01/A04/EE4-L09-C01-A04-P01-01.JPG', alt: '바구니 안에 담긴 공을 가리키는 화살표', value: 'in', title: '안에' },
        {
          src: '/L09/C01/A04/EE4-L09-C01-A04-P01-02.JPG',
          alt: '바구니',
          value: 'basket',
          title: '바구니',
        },
        { src: '/L09/C01/A04/EE4-L09-C01-A04-P01-03.JPG', alt: '책상 위에 있는 공을 가리키는 화살표', value: 'on', title: '위에' },
        {
          src: '/L09/C01/A04/EE4-L09-C01-A04-P01-04.JPG',
          alt: '책상',
          value: 'desk',
          title: '책상',
        },
        {
          src: '/L09/C01/A04/EE4-L09-C01-A04-P01-05.JPG',
          alt: '탁자 아래에 있는 공을 가리키는 화살표',
          value: 'under',
          title: '아래에',
        },
        { src: '/L09/C01/A04/EE4-L09-C01-A04-P01-06.JPG', alt: '탁자', value: 'table', title: '탁자' },
      ]}
      audioList={[
        { audioSrc: '/L09/C01/A04/EE4-L09-C01-A04-P01-01.mp3' },
        { audioSrc: '/L09/C01/A04/EE4-L09-C01-A04-P01-02.mp3' },
        { audioSrc: '/L09/C01/A04/EE4-L09-C01-A04-P01-03.mp3' },
        { audioSrc: '/L09/C01/A04/EE4-L09-C01-A04-P01-04.mp3' },
        { audioSrc: '/L09/C01/A04/EE4-L09-C01-A04-P01-05.mp3' },
        { audioSrc: '/L09/C01/A04/EE4-L09-C01-A04-P01-06.mp3' },
      ]}
      cardWidth={'598px'}
      cardHeight={'364px'}
    />
  );
};

export default P01;
