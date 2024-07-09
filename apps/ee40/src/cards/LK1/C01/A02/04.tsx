import { getCorrectData, getDefaultData } from './pageData';
import EELK1C01A02P04 from '@/Pages/EELK1C01A02P04';

const P04 = () => {
  return (
    <EELK1C01A02P04
      headerInfo={{
        headerText: 'Sounds',
        headerPattern: 'text',
      }}
      mainAudioInfo={{ src: '/LK1/C01/A02/EE4-LK1-C01-A02-P04-01.mp3' }}
      questionInfo={{
        text: 'Lesson 1에서 학습한 발음을 복습해 봅시다.',
      }}
      mainKey={4}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      imageList={[
        { src: '/LK1/C01/A02/EE4-LK1-C01-A02-P04-01.jpg', alt: '개미', value: 'ant' },
        { src: '/LK1/C01/A02/EE4-LK1-C01-A02-P04-02.jpg', alt: '사과', value: 'apple' },
        { src: '/LK1/C01/A02/EE4-LK1-C01-A02-P04-03.jpg', alt: '고양이', value: 'cat' },
        { src: '/LK1/C01/A02/EE4-LK1-C01-A02-P04-04.jpg', alt: '모자', value: 'hat' },
      ]}
      audioList={[
        { audioSrc: '/LK1/C01/A02/EE4-LK1-C01-A02-P04-02.mp3' },
        { audioSrc: '/LK1/C01/A02/EE4-LK1-C01-A02-P04-03.mp3' },
        { audioSrc: '/LK1/C01/A02/EE4-LK1-C01-A02-P04-04.mp3' },
        { audioSrc: '/LK1/C01/A02/EE4-LK1-C01-A02-P04-05.mp3' },
      ]}
      boxWidth='220px'
      boxHeight='330px'
      boxGap={10}
      highlightColor={'red'}
      highlightText={'a'}
    />
  );
};

export default P04;
