import { getCorrectData, getDefaultData } from './pageData';
import EELK1C01A02P04 from '@/Pages/EELK1C01A02P04';

const P06 = () => {
  return (
    <EELK1C01A02P04
      headerInfo={{
        headerText: 'Sounds',
        headerPattern: 'text',
      }}
      mainAudioInfo={{ src: '/LK2/C01/A02/EE4-LK2-C01-A02-P06-01.mp3' }}
      questionInfo={{
        text: 'Lesson 6에서 학습한 발음을 복습해 봅시다.',
      }}
      mainKey={5}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      imageList={[
        { src: '/LK2/C01/A02/EE4-LK2-C01-A02-P06-01.jpg', alt: '케이크', value: 'cake' },
        { src: '/LK2/C01/A02/EE4-LK2-C01-A02-P06-02.jpg', alt: '종이를 자르고 있는 아이', value: 'make' },
        { src: '/LK2/C01/A02/EE4-LK2-C01-A02-P06-03.jpg', alt: '게임판', value: 'game' },
        { src: '/LK2/C01/A02/EE4-LK2-C01-A02-P06-04.jpg', alt: '이수호라는 이름이 적혀 있는 명찰', value: 'name' },
      ]}
      audioList={[
        { audioSrc: '/LK2/C01/A02/EE4-LK2-C01-A02-P06-01.mp3' },
        { audioSrc: '/LK2/C01/A02/EE4-LK2-C01-A02-P06-02.mp3' },
        { audioSrc: '/LK2/C01/A02/EE4-LK2-C01-A02-P06-03.mp3' },
        { audioSrc: '/LK2/C01/A02/EE4-LK2-C01-A02-P06-04.mp3' },
      ]}
      boxWidth='220px'
      boxHeight='330px'
      boxGap={10}
      highlightColor={'red'}
      highlightText={'a'}
    />
  );
};

export default P06;
