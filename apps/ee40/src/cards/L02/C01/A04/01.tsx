// Page: EE4-L02-C01-A04-P01

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
        { src: '/L02/C01/A04/EE4-L02-C01-A04-P01-01.png', alt: '여자가 웃고 있는 모습', value: 'mom', title: '엄마' },
        {
          src: '/L02/C01/A04/EE4-L02-C01-A04-P01-02.png',
          alt: '남자가 미소 짓고 있는 모습',
          value: 'dad',
          title: '아빠',
        },
        { src: '/L02/C01/A04/EE4-L02-C01-A04-P01-03.png', alt: '여자 아이가 웃고 있는 모습', value: 'sister', title: '누나, 언니, 여동생' },
        { src: '/L02/C01/A04/EE4-L02-C01-A04-P01-04.png', alt: '남자 아이가 웃고 있는 모습', value: 'brother', title: '형, 오빠, 남동생' },
        { src: '/L02/C01/A04/EE4-L02-C01-A04-P01-05.png', alt: '이름표가 달린 가방', value: 'name', title: '이름' },
      ]}
      audioList={[
        { audioSrc: '/L02/C01/A04/EE4-L02-C01-A04-P01-01.mp3' },
        { audioSrc: '/L02/C01/A04/EE4-L02-C01-A04-P01-02.mp3' },
        { audioSrc: '/L02/C01/A04/EE4-L02-C01-A04-P01-03.mp3' },
        { audioSrc: '/L02/C01/A04/EE4-L02-C01-A04-P01-04.mp3' },
        { audioSrc: '/L02/C01/A04/EE4-L02-C01-A04-P01-05.mp3' },
      ]}
      cardWidth={'598px'}
      cardHeight={'364px'}
    />
  );
};

export default P01;
