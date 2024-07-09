import { getCorrectData, getDefaultData } from './pageData';
import EEL04C03A05P02 from '@/Pages/EEL04C03A05P02';
import { TMainHeaderInfoTypes, IQuestionProps, IAudioPlayerProps } from '@maidt-cntn/ui';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Words and Sentences 1',
    headerPattern: 'text',
  };

  const srtFile = '/L08/C03/A05/EE4-L08-C03-A05-P03.srt';

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L08/C03/A05/EE4-L08-C03-A05-P03.mp3',
  };

  const questionInfo: IQuestionProps = {
    size: 'large',
    text: '잘 듣고, 문장을 따라 말해 봅시다.',
  };

  const data = [
    {
      en: 'I want this glove. \nHow much is it?',
      ko: '이 글러브를 갖고 싶어. \n얼마니?',
      red: 'glove',
      audioSrc: '/L08/C03/A05/EE4-L08-C03-A05-P03-01.mp3',
    },
    {
      en: 'It’s 1,000 won.',
      ko: '천 원이야.',
      red: '1,000',
      audioSrc: '/L08/C03/A05/EE4-L08-C03-A05-P03-02.mp3',
    },
  ];

  const imgInfo = {
    src: '/L08/C03/A05/EE4-L08-C03-A05-P03.JPG',
    width: '389px',
    height: '394px',
    alt: '집 마당에서 우산,야구 글러브, 장난감 자동차, 장난감 배, 손목시계, 인형을 파는 벼룩시장이 열린 그림, 그 중 야구 글러브에 glove라고 쓰여 있는 그림',
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
