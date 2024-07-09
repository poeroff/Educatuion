import { getCorrectData, getDefaultData } from './pageData';
import EELK1C01A02P04 from '@/Pages/EELK1C01A02P04';

const P06 = () => {
  return (
    <EELK1C01A02P04
      headerInfo={{
        headerText: 'Sounds',
        headerPattern: 'text',
      }}
      mainAudioInfo={{ src: '/LK4/C01/A02/EE4-LK4-C01-A02-P06-01.mp3' }}
      questionInfo={{
        text: 'Lesson 12에서 학습한 발음을 복습해 봅시다.',
      }}
      mainKey={6}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      imageList={[
        { src: '/LK4/C01/A02/EE4-LK4-C01-A02-P06-01.jpg', alt: 'Thank you라고 쓰여진 카드를 들고 있는 아이', value: 'thank' },
        { src: '/LK4/C01/A02/EE4-LK4-C01-A02-P06-02.jpg', alt: '숫자 30 모양의 풍선', value: 'thirty' },
        { src: '/LK4/C01/A02/EE4-LK4-C01-A02-P06-03.jpg', alt: '숫자 3 모양의 케이크', value: 'three' },
        { src: '/LK4/C01/A02/EE4-LK4-C01-A02-P06-04.jpg', alt: 'Thursday에 동그라미와 별 두 개가 그려져 있는 노트', value: 'Thursday' },
      ]}
      audioList={[
        { audioSrc: '/LK4/C01/A02/EE4-LK4-C01-A02-P06-01.mp3' },
        { audioSrc: '/LK4/C01/A02/EE4-LK4-C01-A02-P06-02.mp3' },
        { audioSrc: '/LK4/C01/A02/EE4-LK4-C01-A02-P06-03.mp3' },
        { audioSrc: '/LK4/C01/A02/EE4-LK4-C01-A02-P06-04.mp3' },
      ]}
      boxWidth='220px'
      boxHeight='330px'
      boxGap={10}
      highlightColor={'red'}
      highlightText={'th'}
    />
  );
};

export default P06;
