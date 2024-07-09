import { getCorrectData, getDefaultData } from './pageData';
import EEL04C03A05P02 from '@/Pages/EEL04C03A05P02';
import { TMainHeaderInfoTypes, IQuestionProps, IAudioPlayerProps } from '@maidt-cntn/ui';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Words and Sentences 1',
    headerPattern: 'text',
  };

  const srtFile = '/L04/C03/A05/EE4-L04-C03-A05-P03.srt';

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C03/A05/EE4-L04-C03-A05-P03.mp3',
  };

  const questionInfo: IQuestionProps = {
    size: 'large',
    text: '잘 듣고, 문장을 따라 말해 봅시다.',
  };

  const data = [
    {
      en: 'Don’t talk, please.',
      ko: '말하지 마세요.',
      red: 'talk',
      audioSrc: '/L04/C03/A05/EE4-L04-C03-A05-P03.mp3',
    },
  ];

  const imgInfo = {
    src: '/L04/C03/A05/EE4-L04-C03-A05-P03.JPG',
    width: '389px',
    height: '394px',
    alt: '박물관에 견학 온 학생들이 규칙에 어긋나는 행동을 하고 선생님은 이를 말리려고 하는 모습이 담긴 그림, 떠드는 아이들에게 talk가 쓰여 있는 모습',
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
