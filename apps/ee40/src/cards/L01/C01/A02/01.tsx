import EEL01C01A02P01 from '@/Pages/EEL01C01A02P01';
import { getCorrectData, getDefaultData } from '@/cards/L01/C01/A02/pageData';

const EE40L01C01A02P01 = () => {
  return (
    <EEL01C01A02P01
      headerInfo={{
        headerText: 'Get Ready',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: '여러분은 오늘 기분이 어떤가요?',
      }}
      videoInfo={{
        videoSrc: '/L01/C01/A02/EE4-L01-C01-A02-P01.mp4',
        srtFile: '',
        width: 'fit-content',
        height: '320px',
      }}
      dataKey={{ mainKey: 1, subKey: 'TEXT-01' }}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      textareaWidth={'680px'}
      textareaHeight={'64px'}
    />
  );
};

export default EE40L01C01A02P01;
