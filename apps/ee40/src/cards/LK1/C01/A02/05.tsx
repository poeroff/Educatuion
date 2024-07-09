import { getCorrectData, getDefaultData } from './pageData';
import EELK1C01A02P04 from '@/Pages/EELK1C01A02P04';

const P05 = () => {
  return (
    <EELK1C01A02P04
      headerInfo={{
        headerText: 'Sounds',
        headerPattern: 'text',
      }}
      mainAudioInfo={{ src: '/LK1/C01/A02/EE4-LK1-C01-A02-P05-01.mp3' }}
      questionInfo={{
        text: 'Lesson 2에서 학습한 발음을 복습해 봅시다.',
      }}
      mainKey={5}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      imageList={[
        { src: '/LK1/C01/A02/EE4-LK1-C01-A02-P05-01.jpg', alt: '쥐, 코끼리, 코끼리를 가리키고 있는 화살표', value: 'big' },
        { src: '/LK1/C01/A02/EE4-LK1-C01-A02-P05-02.jpg', alt: '물고기', value: 'fish' },
        { src: '/LK1/C01/A02/EE4-LK1-C01-A02-P05-03.jpg', alt: '서로 안고 있는 자매', value: 'sister' },
        { src: '/LK1/C01/A02/EE4-LK1-C01-A02-P05-04.jpg', alt: '의자에 앉아 있는 아이', value: 'sit' },
      ]}
      audioList={[
        { audioSrc: '/LK1/C01/A02/EE4-LK1-C01-A02-P05-02.mp3' },
        { audioSrc: '/LK1/C01/A02/EE4-LK1-C01-A02-P05-03.mp3' },
        { audioSrc: '/LK1/C01/A02/EE4-LK1-C01-A02-P05-04.mp3' },
        { audioSrc: '/LK1/C01/A02/EE4-LK1-C01-A02-P05-05.mp3' },
      ]}
      boxWidth='220px'
      boxHeight='330px'
      boxGap={10}
      highlightColor={'red'}
      highlightText={'i'}
    />
  );
};

export default P05;
