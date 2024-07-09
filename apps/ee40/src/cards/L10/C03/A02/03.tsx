import { getCorrectData, getDefaultData } from './pageData';
import EEL04C03A02P03 from '@/Pages/EEL04C03A02P03';

const P03 = () => {
  return (
    <EEL04C03A02P03
      headerInfo={{
        headerText: 'Sounds and Letters 1',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: 'sh의 소리에 집중하여 듣고, 따라 말해 봅시다.',
      }}
      mainKey={3}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      imageList={[
        { src: '/L10/C03/A02/EE4-L10-C03-A02-P03-01.jpg', alt: '티셔츠', value: 'shirt' },
        { src: '/L10/C03/A02/EE4-L10-C03-A02-P03-02.jpg', alt: '신발 한 짝', value: 'shoe' },
        { src: '/L10/C03/A02/EE4-L10-C03-A02-P03-03.jpg', alt: '물고기', value: 'fish' },
        { src: '/L10/C03/A02/EE4-L10-C03-A02-P03-04.jpg', alt: '상자를 밀고 있는 아이', value: 'push' },
      ]}
      audioList={[
        { audioSrc: '/L10/C03/A02/EE4-L10-C03-A02-P03-01.mp3' },
        { audioSrc: '/L10/C03/A02/EE4-L10-C03-A02-P03-02.mp3' },
        { audioSrc: '/L10/C03/A02/EE4-L10-C03-A02-P03-03.mp3' },
        { audioSrc: '/L10/C03/A02/EE4-L10-C03-A02-P03-04.mp3' },
      ]}
      boxWidth='220px'
      boxHeight='394px'
      boxGap={10}
      highlightColor={'red'}
      highlightText={'sh'}
    />
  );
};

export default P03;
