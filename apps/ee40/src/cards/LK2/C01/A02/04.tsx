import { getCorrectData, getDefaultData } from './pageData';
import EELK1C01A02P04 from '@/Pages/EELK1C01A02P04';

const P04 = () => {
  return (
    <EELK1C01A02P04
      headerInfo={{
        headerText: 'Sounds',
        headerPattern: 'text',
      }}
      mainAudioInfo={{ src: '/LK2/C01/A02/EE4-LK2-C01-A02-P04-01.mp3' }}
      questionInfo={{
        text: 'Lesson 4에서 학습한 발음을 복습해 봅시다.',
      }}
      mainKey={4}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      imageList={[
        { src: '/LK2/C01/A02/EE4-LK2-C01-A02-P04-01.jpg', alt: '계란 한 알', value: 'egg' },
        { src: '/LK2/C01/A02/EE4-LK2-C01-A02-P04-02.jpg', alt: '침대', value: 'bed' },
        { src: '/LK2/C01/A02/EE4-LK2-C01-A02-P04-03.jpg', alt: '빨간색 그림과 빨간색 물감이 묻어 있는 붓', value: 'red' },
        { src: '/LK2/C01/A02/EE4-LK2-C01-A02-P04-04.jpg', alt: '헬멧', value: 'helmet' },
      ]}
      audioList={[
        { audioSrc: '/LK2/C01/A02/EE4-LK2-C01-A02-P04-01.mp3' },
        { audioSrc: '/LK2/C01/A02/EE4-LK2-C01-A02-P04-02.mp3' },
        { audioSrc: '/LK2/C01/A02/EE4-LK2-C01-A02-P04-03.mp3' },
        { audioSrc: '/LK2/C01/A02/EE4-LK2-C01-A02-P04-04.mp3' },
      ]}
      boxWidth='220px'
      boxHeight='330px'
      boxGap={10}
      highlightColor={'red'}
      highlightText={'e'}
    />
  );
};

export default P04;
