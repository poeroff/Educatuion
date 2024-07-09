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
        text: 'br의 소리에 집중하여 듣고, 따라 말해 봅시다.',
      }}
      mainKey={3}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      imageList={[
        { src: '/L09/C03/A02/EE4-L09-C03-A02-P03-01.jpg', alt: '방울토마토, 베이컨, 계란후라이, 식빵이 담겨 있는 접시', value: 'breakfast' },
        { src: '/L09/C03/A02/EE4-L09-C03-A02-P03-02.jpg', alt: '서로 어깨동무를 하고 있는 형제', value: 'brother' },
        { src: '/L09/C03/A02/EE4-L09-C03-A02-P03-03.jpg', alt: '갈색 물감', value: 'brown' },
        { src: '/L09/C03/A02/EE4-L09-C03-A02-P03-04.jpg', alt: '페인트 붓', value: 'brush' },
      ]}
      audioList={[
        { audioSrc: '/L09/C03/A02/EE4-L09-C03-A02-P03-01.mp3' },
        { audioSrc: '/L09/C03/A02/EE4-L09-C03-A02-P03-02.mp3' },
        { audioSrc: '/L09/C03/A02/EE4-L09-C03-A02-P03-03.mp3' },
        { audioSrc: '/L09/C03/A02/EE4-L09-C03-A02-P03-04.mp3' },
      ]}
      boxWidth='220px'
      boxHeight='394px'
      boxGap={10}
      highlightColor={'red'}
      highlightText={'br'}
    />
  );
};

export default P03;
