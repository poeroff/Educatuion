import { getCorrectData, getDefaultData } from './pageData';
import EELK1C01A02P04 from '@/Pages/EELK1C01A02P04';

const P05 = () => {
  return (
    <EELK1C01A02P04
      headerInfo={{
        headerText: 'Sounds',
        headerPattern: 'text',
      }}
      mainAudioInfo={{ src: '/LK2/C01/A02/EE4-LK2-C01-A02-P05-01.mp3' }}
      questionInfo={{
        text: 'Lesson 5에서 학습한 발음을 복습해 봅시다.',
      }}
      mainKey={5}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      imageList={[
        { src: '/LK2/C01/A02/EE4-LK2-C01-A02-P05-01.jpg', alt: '상자', value: 'box' },
        { src: '/LK2/C01/A02/EE4-LK2-C01-A02-P05-02.jpg', alt: '여우', value: 'fox' },
        { src: '/LK2/C01/A02/EE4-LK2-C01-A02-P05-03.jpg', alt: '아기를 안고 있는 엄마', value: 'mom' },
        { src: '/LK2/C01/A02/EE4-LK2-C01-A02-P05-04.jpg', alt: '축구공을 차고 있는 다리', value: 'soccer' },
      ]}
      audioList={[
        { audioSrc: '/LK2/C01/A02/EE4-LK2-C01-A02-P05-01.mp3' },
        { audioSrc: '/LK2/C01/A02/EE4-LK2-C01-A02-P05-02.mp3' },
        { audioSrc: '/LK2/C01/A02/EE4-LK2-C01-A02-P05-03.mp3' },
        { audioSrc: '/LK2/C01/A02/EE4-LK2-C01-A02-P05-04.mp3' },
      ]}
      boxWidth='220px'
      boxHeight='330px'
      boxGap={10}
      highlightColor={'red'}
      highlightText={'o'}
    />
  );
};

export default P05;
