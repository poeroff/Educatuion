import { getCorrectData, getDefaultData } from './pageData';
import EEL04C03A05P02 from '@/Pages/EEL04C03A05P02';
import { TMainHeaderInfoTypes, IQuestionProps, IAudioPlayerProps } from '@maidt-cntn/ui';

const P05 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Words and Sentences 1',
    headerPattern: 'text',
  };

  const srtFile = '/L07/C03/A05/EE4-L07-C03-A05-P05.srt';

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L07/C03/A05/EE4-L07-C03-A05-P05.mp3',
  };

  const questionInfo: IQuestionProps = {
    size: 'large',
    text: '잘 듣고, 문장을 따라 말해 봅시다.',
  };

  const data = [
    {
      en: 'It’s time for dinner.',
      ko: '저녁 식사할 시간이야.',
      red: 'time for dinner',
      audioSrc: '/L07/C03/A05/EE4-L07-C03-A05-P05.mp3',
    },
  ];

  const imgInfo = {
    src: '/L07/C03/A05/EE4-L07-C03-A05-P05.JPG',
    width: '389px',
    height: '394px',
    alt: '아침 식사하는 아이, 학교 가는 아이, 점심 식사하는 아이, 저녁 식사하는 아이, 잠을 자는 아이의 모습이 시간의 흐름대로 ‘ㄷ‘자 모양으로 이어져 있는 그림. 그 중 오후 6시에 저녁을 먹는 아이의 모습과 그 아래 쓰여 있는 time for dinner',
  };

  const pageInfo = {
    pageNum: 5,
    mainKey: 5,
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
