import { getCorrectData, getDefaultData } from './pageData';
import EELK1C01A02P04 from '@/Pages/EELK1C01A02P04';

const P06 = () => {
  return (
    <EELK1C01A02P04
      headerInfo={{
        headerText: 'Sounds',
        headerPattern: 'text',
      }}
      mainAudioInfo={{ src: '/LK3/C01/A02/EE4-LK3-C01-A02-P06-01.mp3' }}
      questionInfo={{
        text: 'Lesson 9에서 학습한 발음을 복습해 봅시다.',
      }}
      mainKey={6}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      imageList={[
        { src: '/LK3/C01/A02/EE4-LK3-C01-A02-P06-01.jpg', alt: '방울토마토, 베이컨, 계란후라이, 식빵이 담겨 있는 접시', value: 'breakfast' },
        { src: '/LK3/C01/A02/EE4-LK3-C01-A02-P06-02.jpg', alt: '서로 어깨동무를 하고 있는 형제', value: 'brother' },
        { src: '/LK3/C01/A02/EE4-LK3-C01-A02-P06-03.jpg', alt: '갈색 물감', value: 'brown' },
        { src: '/LK3/C01/A02/EE4-LK3-C01-A02-P06-04.jpg', alt: '붓', value: 'brush' },
      ]}
      audioList={[
        { audioSrc: '/LK3/C01/A02/EE4-LK3-C01-A02-P06-02.mp3' },
        { audioSrc: '/LK3/C01/A02/EE4-LK3-C01-A02-P06-03.mp3' },
        { audioSrc: '/LK3/C01/A02/EE4-LK3-C01-A02-P06-04.mp3' },
        { audioSrc: '/LK3/C01/A02/EE4-LK3-C01-A02-P06-05.mp3' },
      ]}
      boxWidth='220px'
      boxHeight='330px'
      boxGap={10}
      highlightColor={'red'}
      highlightText={'br'}
    />
  );
};

export default P06;
