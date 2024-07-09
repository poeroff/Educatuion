import { getCorrectData, getDefaultData } from './pageData';
import EEL04C03A05P02 from '@/Pages/EEL04C03A05P02';
import { TMainHeaderInfoTypes, IQuestionProps, IAudioPlayerProps } from '@maidt-cntn/ui';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Words and Sentences 1',
    headerPattern: 'text',
  };

  const srtFile = '/L05/C03/A05/EE4-L05-C03-A05-P03.srt';

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L05/C03/A05/EE4-L05-C03-A05-P03.mp3',
  };

  const questionInfo: IQuestionProps = {
    size: 'large',
    text: '잘 듣고, 문장을 따라 말해 봅시다.',
  };

  const data = [
    {
      en: 'Let’s play baseball.',
      ko: '우리 야구를 하자.',
      red: 'play baseball',
      audioSrc: '/L05/C03/A05/EE4-L05-C03-A05-P03.mp3',
    },
  ];

  const imgInfo = {
    src: '/L05/C03/A05/EE4-L05-C03-A05-P03.JPG',
    width: '389px',
    height: '394px',
    alt: '네 개의 운동장에서 아이들이 축구, 야구, 농구, 배드민턴을 하고 있는 그림, 그 중 야구하는 아이들이 있는 운동장에는 play baseball이 쓰여 있는 그림',
  };

  const pageInfo = {
    pageNum: 3,
    mainKey: 3,
  };

  return (
    <EEL04C03A05P02
      headerInfo={headerInfo}
      imageInfo={imgInfo}
      pageInfo={pageInfo}
      audioInfo={audioInfo}
      data={data}
      questionInfo={questionInfo}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
    />
  );
};

export default P03;
