import { getCorrectData, getDefaultData } from './pageData';
import EEL04C03A05P02 from '@/Pages/EEL04C03A05P02';
import { TMainHeaderInfoTypes, IQuestionProps, IAudioPlayerProps } from '@maidt-cntn/ui';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Words and Sentences 1',
    headerPattern: 'text',
  };

  const srtFile = '/L10/C03/A05/EE4-L10-C03-A05-P03.srt';

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L10/C03/A05/EE4-L10-C03-A05-P03.mp3',
  };

  const questionInfo: IQuestionProps = {
    size: 'large',
    text: '잘 듣고, 문장을 따라 말해 봅시다.',
  };

  const data = [
    {
      en: 'My shirt is blue.',
      ko: '내 셔츠는 파란색이야.',
      red: ['shirt', 'blue'],
      audioSrc: '/L10/C03/A05/EE4-L10-C03-A05-P03.mp3',
    },
  ];

  const imgInfo = {
    src: '/L10/C03/A05/EE4-L10-C03-A05-P03.JPG',
    width: '389px',
    height: '394px',
    alt: '횡단보도 위에 야구 선수 복장을 하고 있는 사람, 버스기사 복장을 하고 있는 사람, 탐정 복장을 하고 있는 사람, 가수 복장을 하고 있는 사람, 스튜어디스 복장을 하고 있는 사람, 요리사 복장을 하고 있는 사람이 지나다니는 모습, 그 중 버스기사 복장을 하고 있는 사람이 입고 있는 파란 셔츠에 shirt라고 쓰여 있는 모습',
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
