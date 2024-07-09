import { getCorrectData, getDefaultData } from './pageData';
import EELK1C01A02P04 from '@/Pages/EELK1C01A02P04';

const P04 = () => {
  return (
    <EELK1C01A02P04
      headerInfo={{
        headerText: 'Sounds',
        headerPattern: 'text',
      }}
      mainAudioInfo={{ src: '/LK4/C01/A02/EE4-LK4-C01-A02-P04-01.mp3' }}
      questionInfo={{
        text: 'Lesson 10에서 학습한 발음을 복습해 봅시다.',
      }}
      mainKey={4}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      imageList={[
        { src: '/LK4/C01/A02/EE4-LK4-C01-A02-P04-01.jpg', alt: '셔츠', value: 'shirt' },
        { src: '/LK4/C01/A02/EE4-LK4-C01-A02-P04-02.jpg', alt: '신발 한 짝', value: 'shoe' },
        { src: '/LK4/C01/A02/EE4-LK4-C01-A02-P04-03.jpg', alt: '물고기', value: 'fish' },
        { src: '/LK4/C01/A02/EE4-LK4-C01-A02-P04-04.jpg', alt: '상자를 밀고 있는 아이', value: 'push' },
      ]}
      audioList={[
        { audioSrc: '/LK4/C01/A02/EE4-LK4-C01-A02-P04-01.mp3' },
        { audioSrc: '/LK4/C01/A02/EE4-LK4-C01-A02-P04-02.mp3' },
        { audioSrc: '/LK4/C01/A02/EE4-LK4-C01-A02-P04-03.mp3' },
        { audioSrc: '/LK4/C01/A02/EE4-LK4-C01-A02-P04-04.mp3' },
      ]}
      boxWidth='220px'
      boxHeight='330px'
      boxGap={10}
      highlightColor={'red'}
      highlightText={'sh'}
    />
  );
};

export default P04;
