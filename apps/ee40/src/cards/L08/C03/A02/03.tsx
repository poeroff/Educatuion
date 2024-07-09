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
        text: 'ch의 소리에 집중하여 듣고, 따라 말해 봅시다.',
      }}
      mainKey={3}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      imageList={[
        { src: '/L08/C03/A02/EE4-L08-C03-A02-P03-01.jpg', alt: '빨간 의자 한개', value: 'chair' },
        { src: '/L08/C03/A02/EE4-L08-C03-A02-P03-02.jpg', alt: '초콜릿 조각들', value: 'chocolate' },
        { src: '/L08/C03/A02/EE4-L08-C03-A02-P03-03.jpg', alt: '식판에 담긴 점심 급식', value: 'lunch' },
        { src: '/L08/C03/A02/EE4-L08-C03-A02-P03-04.jpg', alt: '스마트 워치', value: 'watch' },
      ]}
      audioList={[
        { audioSrc: '/L08/C03/A02/EE4-L08-C03-A02-P03-01.mp3' },
        { audioSrc: '/L08/C03/A02/EE4-L08-C03-A02-P03-02.mp3' },
        { audioSrc: '/L08/C03/A02/EE4-L08-C03-A02-P03-03.mp3' },
        { audioSrc: '/L08/C03/A02/EE4-L08-C03-A02-P03-04.mp3' },
      ]}
      boxWidth='220px'
      boxHeight='394px'
      boxGap={10}
      highlightColor={'red'}
      highlightText={'ch'}
    />
  );
};

export default P03;
