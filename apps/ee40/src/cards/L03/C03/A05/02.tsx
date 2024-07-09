import { getCorrectData, getDefaultData } from './pageData';
import EEL04C03A05P02 from '@/Pages/EEL04C03A05P02';
import { TMainHeaderInfoTypes, IQuestionProps, IAudioPlayerProps } from '@maidt-cntn/ui';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Words and Sentences 1',
    headerPattern: 'text',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C03/A05/EE4-L03-C03-A05-P02.mp3',
    captionSrc: '/L03/C03/A05/EE4-L03-C03-A05-P02.srt',
  };

  const data = [
    {
      en: 'Who is she?',
      ko: '그녀는 누구니?',
      red: 'she',
      audioSrc: '/L03/C03/A05/EE4-L03-C03-A05-P02-01.mp3',
    },
    {
      en: 'She’s my teacher.',
      ko: '그녀는 나의 선생님이에요.',
      red: ['she', 'teacher'],
      audioSrc: '/L03/C03/A05/EE4-L03-C03-A05-P02-02.mp3',
    },
  ];

  const questionInfo: IQuestionProps = {
    size: 'large',
    text: '잘 듣고, 문장을 따라 말해 봅시다.',
  };

  const imgInfo = {
    src: '/L03/C03/A05/EE4-L03-C03-A05-P02.png',
    width: '389px',
    height: '394px',
    alt: ' 운동장에서 여자아이와 남자아이가 공 던지기 게임을 하고, 선생님은 그 모습을 보고 평가하며 할머니와 할아버지는 그 모습을 보고 손을 흔드는 모습, 선생님 아래에는 teacher가 쓰여 있는 그림',
  };

  const pageInfo = {
    pageNum: 2,
    mainKey: 2,
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

export default P02;
