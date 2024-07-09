import { getCorrectData, getDefaultData } from './pageData';
import EELK1C01A02P04 from '@/Pages/EELK1C01A02P04';

const P05 = () => {
  return (
    <EELK1C01A02P04
      headerInfo={{
        headerText: 'Sounds',
        headerPattern: 'text',
      }}
      mainAudioInfo={{ src: '/LK4/C01/A02/EE4-LK4-C01-A02-P05-01.mp3' }}
      questionInfo={{
        text: 'Lesson 11에서 학습한 발음을 복습해 봅시다.',
      }}
      mainKey={5}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      imageList={[
        { src: '/LK4/C01/A02/EE4-LK4-C01-A02-P05-01.jpg', alt: '교실에서 선생님과 아이들이 함께 이야기를 하고 있는 모습', value: 'class' },
        { src: '/LK4/C01/A02/EE4-LK4-C01-A02-P05-02.jpg', alt: '청소기를 들고 있는 아이', value: 'clean' },
        { src: '/LK4/C01/A02/EE4-LK4-C01-A02-P05-03.jpg', alt: '시계', value: 'clock' },
        { src: '/LK4/C01/A02/EE4-LK4-C01-A02-P05-04.jpg', alt: '구름', value: 'cloud' },
      ]}
      audioList={[
        { audioSrc: '/LK4/C01/A02/EE4-LK4-C01-A02-P05-01.mp3' },
        { audioSrc: '/LK4/C01/A02/EE4-LK4-C01-A02-P05-02.mp3' },
        { audioSrc: '/LK4/C01/A02/EE4-LK4-C01-A02-P05-03.mp3' },
        { audioSrc: '/LK4/C01/A02/EE4-LK4-C01-A02-P05-04.mp3' },
      ]}
      boxWidth='220px'
      boxHeight='330px'
      boxGap={10}
      highlightColor={'red'}
      highlightText={'cl'}
    />
  );
};

export default P05;
