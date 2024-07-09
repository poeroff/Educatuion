import EEL04C01A04P03 from '@/Pages/EEL04C01A04P03';
import { getCorrectData, getDefaultData } from './pageData';

const P02 = () => {
  return (
    <EEL04C01A04P03
      headerInfo={{
        headerText: 'Story Song',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: '앞에서 익힌 노래를 직접 불러 봅시다.',
      }}
      videoInfo={{
        videoSrc: '/L08/C02/A03/EE4-L08-C02-A03-P02.mp4',
        srtFile: '',
        width: 480,
        height: 360,
      }}
      dataKey={{ mainKey: 2, subKey: 'RECORDER-1' }}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
    />
  );
};

export default P02;
