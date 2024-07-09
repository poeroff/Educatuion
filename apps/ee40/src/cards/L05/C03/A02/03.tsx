import { getCorrectData, getDefaultData } from './pageData';
import EEL05C03A02P03 from '@/Pages/EEL05C03A02P03';

const P03 = () => {
  return (
    <EEL05C03A02P03
      headerInfo={{
        headerText: 'Sounds and Letters 1',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: 'o의 소리에 집중하여 듣고, 따라 말해 봅시다.',
      }}
      mainKey={3}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      imageList={[
        { src: '/L05/C03/A02/EE4-L05-C03-A02-P03-01.jpg', alt: '상자', value: 'box' },
        { src: '/L05/C03/A02/EE4-L05-C03-A02-P03-02.jpg', alt: '여우', value: 'fox' },
        { src: '/L05/C03/A02/EE4-L05-C03-A02-P03-03.JPG', alt: '아이를 안고 있는 여자를 가리키고 있는 화살표', value: 'mom' },
        { src: '/L05/C03/A02/EE4-L05-C03-A02-P03-04.JPG', alt: '축구공을 차고 있는 다리', value: 'soccer' },
      ]}
      audioList={[
        { audioSrc: '/L05/C03/A02/EE4-L05-C03-A02-P03-01.mp3' },
        { audioSrc: '/L05/C03/A02/EE4-L05-C03-A02-P03-02.mp3' },
        { audioSrc: '/L05/C03/A02/EE4-L05-C03-A02-P03-03.mp3' },
        { audioSrc: '/L05/C03/A02/EE4-L05-C03-A02-P03-04.mp3' },
      ]}
      boxWidth='220px'
      boxHeight='394px'
      boxGap={10}
      highlightColor={'red'}
    />
  );
};

export default P03;
