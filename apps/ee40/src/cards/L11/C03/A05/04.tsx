import { getCorrectData, getDefaultData } from './pageData';
import EEL04C03A05P02 from '@/Pages/EEL04C03A05P02';
import { TMainHeaderInfoTypes, IQuestionProps, IAudioPlayerProps } from '@maidt-cntn/ui';

const P04 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Words and Sentences 1',
    headerPattern: 'text',
  };

  const srtFile = '/L11/C03/A05/EE4-L11-C03-A05-P04.srt';

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L11/C03/A05/EE4-L11-C03-A05-P04.mp3',
  };

  const questionInfo: IQuestionProps = {
    size: 'large',
    text: '잘 듣고, 문장을 따라 말해 봅시다.',
  };

  const data = [
    {
      en: 'What day is it today?',
      ko: '오늘 무슨 요일이니?',
      red: '',
      audioSrc: '/L11/C03/A05/EE4-L11-C03-A05-P04-01.mp3',
    },
    {
      en: 'It’s Wednesday.',
      ko: '수요일이요.',
      red: 'Wednesday',
      audioSrc: '/L11/C03/A05/EE4-L11-C03-A05-P04-02.mp3',
    },
  ];

  const imgInfo = {
    src: '/L11/C03/A05/EE4-L11-C03-A05-P04.JPG',
    width: '389px',
    height: '394px',
    alt: '코끼리 선생님과 닭, 원숭이, 곰, 강아지, 고양이, 양, 거북이 학생들이 수업하고 있는 그림, Monday라고 적힌 노트를 들고 있는 닭, Tuesday라고 적힌 노트를 들고 있는 원숭이, Wednesday라고 적힌 노트를 들고 있는 곰, Thursday라고 적힌 노트를 들고 있는 강아지, Friday라고 적힌 노트를 들고 있는 고양이, Saturday라고 적힌 노트를 들고 있는 양, Sunday라고 적힌 노트를 들고 있는 거북이 그림, 그 중 곰이 들고 있는 노트에 적힌 Wednesday가 붉게 되어 있는 모습',
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
