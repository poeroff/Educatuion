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
        text: 'cl의 소리에 집중하여 듣고, 따라 말해 봅시다.',
      }}
      mainKey={3}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      imageList={[
        { src: '/L11/C03/A02/EE4-L11-C03-A02-P03-01.jpg', alt: '교실에서 선생님과 아이들이 함께 이야기를 하고 있는 모습', value: 'class' },
        { src: '/L11/C03/A02/EE4-L11-C03-A02-P03-02.jpg', alt: '청소기를 들고 청소하는 아이', value: 'clean' },
        { src: '/L11/C03/A02/EE4-L11-C03-A02-P03-03.jpg', alt: '시계', value: 'clock' },
        { src: '/L11/C03/A02/EE4-L11-C03-A02-P03-04.jpg', alt: '구름', value: 'cloud' },
      ]}
      audioList={[
        { audioSrc: '/L11/C03/A02/EE4-L11-C03-A02-P03-01.mp3' },
        { audioSrc: '/L11/C03/A02/EE4-L11-C03-A02-P03-02.mp3' },
        { audioSrc: '/L11/C03/A02/EE4-L11-C03-A02-P03-03.mp3' },
        { audioSrc: '/L11/C03/A02/EE4-L11-C03-A02-P03-04.mp3' },
      ]}
      boxWidth='220px'
      boxHeight='394px'
      boxGap={10}
      highlightColor={'red'}
      highlightText={'cl'}
    />
  );
};

export default P03;
