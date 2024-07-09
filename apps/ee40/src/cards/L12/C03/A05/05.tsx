import { getCorrectData, getDefaultData } from './pageData';
import EEL04C03A05P02 from '@/Pages/EEL04C03A05P02';
import { TMainHeaderInfoTypes, IQuestionProps, IAudioPlayerProps } from '@maidt-cntn/ui';

const P05 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Words and Sentences 1',
    headerPattern: 'text',
  };

  const srtFile = '/L12/C03/A05/EE4-L12-C03-A05-P05.srt';

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L12/C03/A05/EE4-L12-C03-A05-P05.mp3',
  };

  const questionInfo: IQuestionProps = {
    size: 'large',
    text: '잘 듣고, 문장을 따라 말해 봅시다.',
  };

  const data = [
    {
      en: 'What do you do on weekends?',
      ko: '너는 주말에 무엇을 하니?',
      red: '',
      audioSrc: '/L12/C03/A05/EE4-L12-C03-A05-P05-01.mp3',
    },
    {
      en: 'I play the piano.',
      ko: '나는 피아노를 쳐.',
      red: 'play the piano',
      audioSrc: '/L12/C03/A05/EE4-L12-C03-A05-P05-02.mp3',
    },
  ];

  const imgInfo = {
    src: '/L12/C03/A05/EE4-L12-C03-A05-P05.JPG',
    width: '389px',
    height: '394px',
    alt: '야외에서 자전거를 타고 있는 아이와 강아지를 산책시키는 아이의 모습, 집에서 영화를 보는 아이와 피아노를 치는 아이의 모습이 담긴 그림, 그 중 피아노를 치는 아이의 모습에 쓰여 있는 play the piano',
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

export default P05;
