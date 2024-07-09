import { getCorrectData, getDefaultData } from './pageData';
import EEL04C03A02P03 from '@/Pages/EEL04C03A02P03';

const P03 = () => {
  return (
    <EEL04C03A02P03
      headerInfo={{
        headerText: 'Sounds and Letters 1',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: 'th의 소리에 집중하여 듣고, 따라 말해 봅시다.',
      }}
      mainKey={3}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      imageList={[
        { src: '/L12/C03/A02/EE4-L12-C03-A02-P03-01.jpg', alt: 'Thank you라고 쓰여진 카드를 들고 있는 아이', value: 'thank' },
        { src: '/L12/C03/A02/EE4-L12-C03-A02-P03-02.JPG', alt: '숫자 30 모양의 풍선', value: 'thirty' },
        { src: '/L12/C03/A02/EE4-L12-C03-A02-P03-03.jpg', alt: '숫자 3 모양의 쿠키', value: 'three' },
        { src: '/L12/C03/A02/EE4-L12-C03-A02-P03-04.JPG', alt: 'Thursday에 동그라미와 별 두 개가 그려져 있는 노트', value: 'Thursday' },
      ]}
      audioList={[
        { audioSrc: '/L12/C03/A02/EE4-L12-C03-A02-P03-01.mp3' },
        { audioSrc: '/L12/C03/A02/EE4-L12-C03-A02-P03-02.mp3' },
        { audioSrc: '/L12/C03/A02/EE4-L12-C03-A02-P03-03.mp3' },
        { audioSrc: '/L12/C03/A02/EE4-L12-C03-A02-P03-04.mp3' },
      ]}
      boxWidth='220px'
      boxHeight='394px'
      boxGap={10}
      highlightColor={'red'}
      highlightText={'th'}
    />
  );
};

export default P03;
