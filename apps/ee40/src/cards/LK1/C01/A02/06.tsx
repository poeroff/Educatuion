import { getCorrectData, getDefaultData } from './pageData';
import EELK1C01A02P04 from '@/Pages/EELK1C01A02P04';

const P06 = () => {
  return (
    <EELK1C01A02P04
      headerInfo={{
        headerText: 'Sounds',
        headerPattern: 'text',
      }}
      mainAudioInfo={{ src: '/LK1/C01/A02/EE4-LK1-C01-A02-P06-01.mp3' }}
      questionInfo={{
        text: 'Lesson 3에서 학습한 발음을 복습해 봅시다.',
      }}
      mainKey={6}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      imageList={[
        { src: '/LK1/C01/A02/EE4-LK1-C01-A02-P06-01.jpg', alt: '위를 가리키는 화살표', value: 'up' },
        { src: '/LK1/C01/A02/EE4-LK1-C01-A02-P06-02.jpg', alt: '컵', value: 'cup' },
        { src: '/LK1/C01/A02/EE4-LK1-C01-A02-P06-03.jpg', alt: '활짝 웃고 있는 아이', value: 'fun' },
        { src: '/LK1/C01/A02/EE4-LK1-C01-A02-P06-04.jpg', alt: '달리고 있는 아이', value: 'run' },
      ]}
      audioList={[
        { audioSrc: '/LK1/C01/A02/EE4-LK1-C01-A02-P06-02.mp3' },
        { audioSrc: '/LK1/C01/A02/EE4-LK1-C01-A02-P06-03.mp3' },
        { audioSrc: '/LK1/C01/A02/EE4-LK1-C01-A02-P06-04.mp3' },
        { audioSrc: '/LK1/C01/A02/EE4-LK1-C01-A02-P06-05.mp3' },
      ]}
      boxWidth='220px'
      boxHeight='330px'
      boxGap={10}
      highlightColor={'red'}
      highlightText={'u'}
    />
  );
};

export default P06;
