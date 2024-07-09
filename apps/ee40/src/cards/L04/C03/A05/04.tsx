import { getCorrectData, getDefaultData } from './pageData';
import EEL04C03A05P02 from '@/Pages/EEL04C03A05P02';
import { TMainHeaderInfoTypes, IQuestionProps, IAudioPlayerProps } from '@maidt-cntn/ui';

const P04 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Words and Sentences 1',
    headerPattern: 'text',
  };

  const srtFile = '/L04/C03/A05/EE4-L04-C03-A05-P04.srt';

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C03/A05/EE4-L04-C03-A05-P04.mp3',
  };

  const questionInfo: IQuestionProps = {
    size: 'large',
    text: '잘 듣고, 문장을 따라 말해 봅시다.',
  };

  const data = [
    {
      en: 'Don’t eat, please.',
      ko: '먹지 마세요.',
      red: 'eat',
      audioSrc: '/L04/C03/A05/EE4-L04-C03-A05-P04.mp3',
    },
  ];

  const imgInfo = {
    src: '/L04/C03/A05/EE4-L04-C03-A05-P04.JPG',
    width: '389px',
    height: '394px',
    alt: '박물관에 견학 온 학생들이 규칙에 어긋나는 행동을 하고 선생님은 이를 말리려고 하는 모습이 담긴 그림, 목발을 짚고 아이스크림을 먹는 아이에게 eat이 쓰여 있는 모습',
  };

  const pageInfo = {
    pageNum: 4,
    mainKey: 4,
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

export default P04;
