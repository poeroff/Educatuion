import { getCorrectData, getDefaultData } from './pageData';
import EEL04C03A05P02 from '@/Pages/EEL04C03A05P02';
import { TMainHeaderInfoTypes, IQuestionProps, IAudioPlayerProps } from '@maidt-cntn/ui';

const P04 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Words and Sentences 1',
    headerPattern: 'text',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C03/A05/EE4-L03-C03-A05-P04.mp3',
    captionSrc: '/L03/C03/A05/EE4-L03-C03-A05-P04.srt',
  };

  const data = [
    {
      en: 'Who is she?',
      ko: '그녀는 누구니?',
      red: 'she',
      audioSrc: '/L03/C03/A05/EE4-L03-C03-A05-P04-01.mp3',
    },
    {
      en: 'She’s my grandma.',
      ko: '그녀는 나의 할머니에요.',
      red: ['She', 'grandma'],
      audioSrc: '/L03/C03/A05/EE4-L03-C03-A05-P04-02.mp3',
    },
  ];

  const questionInfo: IQuestionProps = {
    size: 'large',
    text: '잘 듣고, 문장을 따라 말해 봅시다.',
  };

  const imgInfo = {
    src: '/L03/C03/A05/EE4-L03-C03-A05-P04.png',
    width: '389px',
    height: '394px',
    alt: '운동장에서 여자아이와 남자아이가 공 던지기 게임을 하고, 선생님은 그 모습을 보고 평가하며 할머니와 할아버지는 그 모습을 보고 손을 흔드는 모습, 할머니 아래에는 grandma가 쓰여 있는 그림',
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
