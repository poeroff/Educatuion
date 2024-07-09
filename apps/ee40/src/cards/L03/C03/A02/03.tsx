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
        text: 'u의 소리에 집중하여 듣고, 따라 말해 봅시다.',
      }}
      mainKey={3}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      imageList={[
        { src: '/L03/C03/A02/EE4-L03-C03-A02-P03-01.JPG', alt: '위를 가리키는 화살표', value: 'up' },
        { src: '/L03/C03/A02/EE4-L03-C03-A02-P03-02.jpg', alt: '컵', value: 'cup' },
        { src: '/L03/C03/A02/EE4-L03-C03-A02-P03-03.jpg', alt: '활짝 웃고 있는 아이', value: 'fun' },
        { src: '/L03/C03/A02/EE4-L03-C03-A02-P03-04.JPG', alt: '달리고 있는 아이', value: 'run' },
      ]}
      audioList={[
        { audioSrc: '/L03/C03/A02/EE4-L03-C03-A02-P03-01.mp3' },
        { audioSrc: '/L03/C03/A02/EE4-L03-C03-A02-P03-02.mp3' },
        { audioSrc: '/L03/C03/A02/EE4-L03-C03-A02-P03-03.mp3' },
        { audioSrc: '/L03/C03/A02/EE4-L03-C03-A02-P03-04.mp3' },
      ]}
      boxWidth='220px'
      boxHeight='394px'
      boxGap={10}
      highlightColor={'red'}
    />
  );
};

export default P03;
