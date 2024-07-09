import EEL04C01A04P03 from '@/Pages/EEL04C01A04P03';
import { getCorrectData, getDefaultData } from './pageData';

const P03 = () => {
  return (
    <EEL04C01A04P03
      headerInfo={{
        headerText: 'Words',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: '단어를 기억하며 찬트를 직접 불러 봅시다.',
      }}
      videoInfo={{
        videoSrc: '/L09/C01/A04/EE4-L09-C01-A04-P03.mp4',
        srtFile: '',
        width: 480,
        height: 360,
      }}
      dataKey={{ mainKey: 3, subKey: 'RECORDER-1' }}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
    />
  );
};

export default P03;
