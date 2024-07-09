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
        text: 'i의 소리에 집중하여 듣고, 따라 말해 봅시다.',
      }}
      mainKey={3}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      imageList={[
        { src: '/L07/C03/A02/EE4-L07-C03-A02-P03-01.jpg', alt: '숫자 5를 나타내는 풍선', value: 'five' },
        { src: '/L07/C03/A02/EE4-L07-C03-A02-P03-02.jpg', alt: '학생들이 줄 서고 있는 모습', value: 'line' },
        { src: '/L07/C03/A02/EE4-L07-C03-A02-P03-03.jpg', alt: '숫자 9', value: 'nine' },
        { src: '/L07/C03/A02/EE4-L07-C03-A02-P03-04.jpg', alt: '모래시계 세 개', value: 'time' },
      ]}
      audioList={[
        { audioSrc: '/L07/C03/A02/EE4-L07-C03-A02-P03-01.mp3' },
        { audioSrc: '/L07/C03/A02/EE4-L07-C03-A02-P03-02.mp3' },
        { audioSrc: '/L07/C03/A02/EE4-L07-C03-A02-P03-03.mp3' },
        { audioSrc: '/L07/C03/A02/EE4-L07-C03-A02-P03-04.mp3' },
      ]}
      boxWidth='220px'
      boxHeight='394px'
      boxGap={10}
      highlightColor={'red'}
      highlightText={'i'}
    />
  );
};

export default P03;
