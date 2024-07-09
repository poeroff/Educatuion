import { getCorrectData, getDefaultData } from './pageData';
import EEL04C03A05P02 from '@/Pages/EEL04C03A05P02';
import { TMainHeaderInfoTypes, IQuestionProps, IAudioPlayerProps } from '@maidt-cntn/ui';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Words and Sentences 1',
    headerPattern: 'text',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C03/A05/EE4-L03-C03-A05-P03.mp3',
    captionSrc: '/L03/C03/A05/EE4-L03-C03-A05-P03.srt',
  };

  const data = [
    {
      en: 'Who is he?',
      ko: '그는 누구니?',
      red: 'he',
      audioSrc: '/L03/C03/A05/EE4-L03-C03-A05-P03-01.mp3',
    },
    {
      en: 'He’s my friend.',
      ko: '그는 나의 친구에요.',
      red: ['He', 'friend'],
      audioSrc: '/L03/C03/A05/EE4-L03-C03-A05-P03-02.mp3',
    },
  ];

  const questionInfo: IQuestionProps = {
    size: 'large',
    text: '잘 듣고, 문장을 따라 말해 봅시다.',
  };

  const imgInfo = {
    src: '/L03/C03/A05/EE4-L03-C03-A05-P03.png',
    width: '389px',
    height: '394px',
    alt: '운동장에서 여자아이와 남자아이가 공 던지기 게임을 하고, 선생님은 그 모습을 보고 평가하며 할머니와 할아버지는 그 모습을 보고 손을 흔드는 모습, 남자아이 아래에는 friend가 쓰여 있는 그림',
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
