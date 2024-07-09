import { getCorrectData, getDefaultData } from './pageData';
import EELK1C01A02P04 from '@/Pages/EELK1C01A02P04';

const P04 = () => {
  return (
    <EELK1C01A02P04
      headerInfo={{
        headerText: 'Sounds',
        headerPattern: 'text',
      }}
      mainAudioInfo={{ src: '/LK3/C01/A02/EE4-LK3-C01-A02-P04-01.mp3' }}
      questionInfo={{
        text: 'Lesson 7에서 학습한 발음을 복습해 봅시다.',
      }}
      mainKey={4}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      imageList={[
        { src: '/LK3/C01/A02/EE4-LK3-C01-A02-P04-01.jpg', alt: '숫자 5를 나타내는 풍선', value: 'five' },
        { src: '/LK3/C01/A02/EE4-LK3-C01-A02-P04-02.jpg', alt: '학생들이 줄 서고 있는 모습', value: 'line' },
        { src: '/LK3/C01/A02/EE4-LK3-C01-A02-P04-03.jpg', alt: '숫자 9', value: 'nine' },
        { src: '/LK3/C01/A02/EE4-LK3-C01-A02-P04-04.jpg', alt: '모래시계 세 개', value: 'time' },
      ]}
      audioList={[
        { audioSrc: '/LK3/C01/A02/EE4-LK3-C01-A02-P04-02.mp3' },
        { audioSrc: '/LK3/C01/A02/EE4-LK3-C01-A02-P04-03.mp3' },
        { audioSrc: '/LK3/C01/A02/EE4-LK3-C01-A02-P04-04.mp3' },
        { audioSrc: '/LK3/C01/A02/EE4-LK3-C01-A02-P04-05.mp3' },
      ]}
      boxWidth='220px'
      boxHeight='330px'
      boxGap={10}
      highlightColor={'red'}
      highlightText={'i'}
    />
  );
};

export default P04;
