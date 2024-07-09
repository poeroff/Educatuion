import { getCorrectData, getDefaultData } from './pageData';
import EEL01C03A02P03 from '@/Pages/EEL01C03A02P03';

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
        { src: '/L06/C03/A02/EE4-L06-C03-A02-P03-01.jpg', alt: '케이크', value: 'cake' },
        { src: '/L06/C03/A02/EE4-L06-C03-A02-P03-02.jpg', alt: '종이를 자르고 있는 아이', value: 'make' },
        { src: '/L06/C03/A02/EE4-L06-C03-A02-P03-03.jpg', alt: '게임판', value: 'game' },
        { src: '/L06/C03/A02/EE4-L06-C03-A02-P03-04.JPG', alt: '이수호라는 이름이 적혀 있는 명찰', value: 'name' },
      ]}
      audioList={[
        { audioSrc: '/L06/C03/A02/EE4-L06-C03-A02-P03-02.mp3' },
        { audioSrc: '/L06/C03/A02/EE4-L06-C03-A02-P03-01.mp3' },
        { audioSrc: '/L06/C03/A02/EE4-L06-C03-A02-P03-03.mp3' },
        { audioSrc: '/L06/C03/A02/EE4-L06-C03-A02-P03-04.mp3' },
      ]}
      boxWidth='220px'
      boxHeight='394px'
      boxGap={10}
      highlightColor={'red'}
    />
  );
};

export default P03;
