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
        text: 'i의 소리에 집중하여 듣고, 따라 말해 봅시다.',
      }}
      mainKey={3}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      imageList={[
        { src: '/L02/C03/A02/EE4-L02-C03-A02-P03-01.JPG', alt: '쥐, 코끼리, 코끼리를 가리키고 있는 화살표', value: 'big' },
        { src: '/L02/C03/A02/EE4-L02-C03-A02-P03-02.jpg', alt: '물고기', value: 'fish' },
        { src: '/L02/C03/A02/EE4-L02-C03-A02-P03-03.jpg', alt: '서로 안고 있는 자매', value: 'sister' },
        { src: '/L02/C03/A02/EE4-L02-C03-A02-P03-04.jpg', alt: '의자에 앉아 있는 아이', value: 'sit' },
      ]}
      audioList={[
        { audioSrc: '/L02/C03/A02/EE4-L02-C03-A02-P03-01.mp3' },
        { audioSrc: '/L02/C03/A02/EE4-L02-C03-A02-P03-02.mp3' },
        { audioSrc: '/L02/C03/A02/EE4-L02-C03-A02-P03-03.mp3' },
        { audioSrc: '/L02/C03/A02/EE4-L02-C03-A02-P03-04.mp3' },
      ]}
      boxWidth='220px'
      boxHeight='394px'
      boxGap={10}
      highlightColor={'red'}
    />
  );
};

export default P03;
