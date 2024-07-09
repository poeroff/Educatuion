import { getCorrectData, getDefaultData } from './pageData';
import EELK1C01A02P04 from '@/Pages/EELK1C01A02P04';

const P05 = () => {
  return (
    <EELK1C01A02P04
      headerInfo={{
        headerText: 'Sounds',
        headerPattern: 'text',
      }}
      mainAudioInfo={{ src: '/LK3/C01/A02/EE4-LK3-C01-A02-P05-01.mp3' }}
      questionInfo={{
        text: 'Lesson 8에서 학습한 발음을 복습해 봅시다.',
      }}
      mainKey={5}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      imageList={[
        { src: '/LK3/C01/A02/EE4-LK3-C01-A02-P05-01.jpg', alt: '의자', value: 'chair' },
        { src: '/LK3/C01/A02/EE4-LK3-C01-A02-P05-02.jpg', alt: '초콜릿', value: 'chocolate' },
        { src: '/LK3/C01/A02/EE4-LK3-C01-A02-P05-03.jpg', alt: '수저, 사과, 샐러드, 요거트, 빵, 볶음밥이 담겨 있는 식판', value: 'lunch' },
        { src: '/LK3/C01/A02/EE4-LK3-C01-A02-P05-04.jpg', alt: '손목시계', value: 'watch' },
      ]}
      audioList={[
        { audioSrc: '/LK3/C01/A02/EE4-LK3-C01-A02-P05-02.mp3' },
        { audioSrc: '/LK3/C01/A02/EE4-LK3-C01-A02-P05-03.mp3' },
        { audioSrc: '/LK3/C01/A02/EE4-LK3-C01-A02-P05-04.mp3' },
        { audioSrc: '/LK3/C01/A02/EE4-LK3-C01-A02-P05-05.mp3' },
      ]}
      boxWidth='220px'
      boxHeight='330px'
      boxGap={10}
      highlightColor={'red'}
      highlightText={'ch'}
    />
  );
};

export default P05;
