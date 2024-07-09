import EEL01C01A02P01 from '@/Pages/EEL01C01A02P01';
import { getCorrectData, getDefaultData } from '@/cards/L01/C01/A02/pageData';

const P01 = () => {
  return (
    <EEL01C01A02P01
      headerInfo={{
        headerText: 'Get Ready',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: '여러분이 좋아하는 운동은 무엇인가요?',
      }}
      videoInfo={{
        videoSrc: '/L05/C01/A02/EE4-L05-C01-A02-P01.mp4',
        srtFile: '',
        width: 684,
        height: 310,
      }}
      dataKey={{ mainKey: 1, subKey: 'TEXT-01' }}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      textareaWidth={'680px'}
      textareaHeight={'64px'}
    />
  );
};

export default P01;
