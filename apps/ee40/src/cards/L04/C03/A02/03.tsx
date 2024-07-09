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
        text: 'e의 소리에 집중하여 듣고, 따라 말해 봅시다.',
      }}
      mainKey={3}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      imageList={[
        { src: '/L04/C03/A02/EE4-L04-C03-A02-P03-01.jpg', alt: '계란 한 알', value: 'egg' },
        { src: '/L04/C03/A02/EE4-L04-C03-A02-P03-02.jpg', alt: '침대', value: 'bed' },
        { src: '/L04/C03/A02/EE4-L04-C03-A02-P03-03.jpg', alt: '빨간색 그림과 빨간색 물감이 묻어 있는 붓', value: 'red' },
        { src: '/L04/C03/A02/EE4-L04-C03-A02-P03-04.jpg', alt: '헬멧', value: 'helmet' },
      ]}
      audioList={[
        { audioSrc: '/L04/C03/A02/EE4-L04-C03-A02-P03-01.mp3' },
        { audioSrc: '/L04/C03/A02/EE4-L04-C03-A02-P03-02.mp3' },
        { audioSrc: '/L04/C03/A02/EE4-L04-C03-A02-P03-03.mp3' },
        { audioSrc: '/L04/C03/A02/EE4-L04-C03-A02-P03-04.mp3' },
      ]}
      boxWidth='220px'
      boxHeight='394px'
      boxGap={10}
      highlightColor={'red'}
      highlightText={'e'}
    />
  );
};

export default P03;
