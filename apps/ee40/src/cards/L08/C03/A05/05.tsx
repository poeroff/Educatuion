import { getCorrectData, getDefaultData } from './pageData';
import EEL04C03A05P02 from '@/Pages/EEL04C03A05P02';
import { TMainHeaderInfoTypes, IQuestionProps, IAudioPlayerProps } from '@maidt-cntn/ui';

const P05 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Words and Sentences 1',
    headerPattern: 'text',
  };

  const srtFile = '/L08/C03/A05/EE4-L08-C03-A05-P05.srt';

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L08/C03/A05/EE4-L08-C03-A05-P05.mp3',
  };

  const questionInfo: IQuestionProps = {
    size: 'large',
    text: '잘 듣고, 문장을 따라 말해 봅시다.',
  };

  const data = [
    {
      en: 'I want this boat. \nHow much is it?',
      ko: '이 배를 갖고 싶어. \n얼마니?',
      red: 'boat',
      audioSrc: '/L08/C03/A05/EE4-L08-C03-A05-P05-01.mp3',
    },
    {
      en: 'It’s 400 won.',
      ko: '사백 원이야.',
      red: '400',
      audioSrc: '/L08/C03/A05/EE4-L08-C03-A05-P05-02.mp3',
    },
  ];

  const imgInfo = {
    src: '/L08/C03/A05/EE4-L08-C03-A05-P05.JPG',
    width: '389px',
    height: '394px',
    alt: '집 마당에서 우산,야구 글러브, 장난감 자동차, 장난감 배, 손목시계, 인형을 파는 벼룩시장이 열린 그림, 그 중 장난감 배에 boat라고 쓰여 있는 그림',
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
