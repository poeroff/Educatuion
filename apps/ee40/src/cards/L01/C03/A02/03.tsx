import EEL01C03A02P03 from '@/Pages/EEL01C03A02P03';
import { getCorrectData, getDefaultData } from './pageData';

const P03 = () => {
  return (
    <EEL01C03A02P03
      headerInfo={{
        headerText: 'Sounds and Letters 1',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: 'a의 소리에 집중하여 듣고, 따라 말해 봅시다.',
      }}
      mainKey={3}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      imageList={[
        { src: '/L01/C03/A02/EE4-L01-C03-A02-P03-01.png', alt: '개미', value: 'ant' },
        { src: '/L01/C03/A02/EE4-L01-C03-A02-P03-02.png', alt: '사과', value: 'apple' },
        { src: '/L01/C03/A02/EE4-L01-C03-A02-P03-03.png', alt: '고양이', value: 'cat' },
        { src: '/L01/C03/A02/EE4-L01-C03-A02-P03-04.png', alt: '모자', value: 'hat' },
      ]}
      audioList={[
        { audioSrc: '/L01/C03/A02/EE4-L01-C03-A02-P03-01.mp3' },
        { audioSrc: '/L01/C03/A02/EE4-L01-C03-A02-P03-02.mp3' },
        { audioSrc: '/L01/C03/A02/EE4-L01-C03-A02-P03-03.mp3' },
        { audioSrc: '/L01/C03/A02/EE4-L01-C03-A02-P03-04.mp3' },
      ]}
      boxWidth='220px'
      boxHeight='394px'
      boxGap={10}
      highlightColor={'red'}
    />
  );
};

export default P03;
