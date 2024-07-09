import { getCorrectData, getDefaultData } from './pageData';
import EEL04C03A05P02 from '@/Pages/EEL04C03A05P02';
import { TMainHeaderInfoTypes, IQuestionProps, IAudioPlayerProps } from '@maidt-cntn/ui';

const P04 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Words and Sentences 1',
    headerPattern: 'text',
  };

  const srtFile = '/L02/C03/A05/EE4-L02-C03-A05-P04.srt';

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C03/A05/EE4-L02-C03-A05-P04.mp3',
  };

  const questionInfo: IQuestionProps = {
    size: 'large',
    text: '잘 듣고, 문장을 따라 말해 봅시다.',
  };

  const data = [
    {
      en: 'This is my sister.',
      ko: '이 아이는 나의 여동생이야.',
      red: 'sister',
      audioSrc: '/L02/C03/A05/EE4-L02-C03-A05-P04.mp3',
    },
  ];

  const imgInfo = {
    src: '/L02/C03/A05/EE4-L02-C03-A05-P04.JPG',
    width: '389px',
    height: '394px',
    alt: 'I라고 쓰여진 여자아이를 위해 그 아이의 아빠, 엄마, 오빠, 여동생이 생일 파티를 준비하는 모습, 여동생 아래에는 sister라고 쓰여 있는 그림',
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
