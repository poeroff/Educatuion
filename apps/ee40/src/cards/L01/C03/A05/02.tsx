import { getCorrectData, getDefaultData } from './pageData';
import EEL01C03A05P02 from '@/Pages/EEL01C03A05P02';
import { TMainHeaderInfoTypes, IQuestionProps, IAudioPlayerProps } from '@maidt-cntn/ui';

const EE40L01C03A05P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Words and Sentences 1',
    headerPattern: 'text',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C03/A05/EE4-L01-C03-A05-P02.mp3',
    captionSrc: '/L01/C03/A05/EE4-L01-C03-A05-P02.srt',
  };

  const data = [
    {
      en: 'Good morning. How are you?',
      ko: '좋은 아침이야. 기분이 어때?',
      red: 'morning',
      audioSrc: '/L01/C03/A05/EE4-L01-C03-A05-P02-01.mp3',
    },
    {
      en: 'I´m good.',
      ko: '좋아요.',
      red: 'good',
      audioSrc: '/L01/C03/A05/EE4-L01-C03-A05-P02-02.mp3',
    },
  ];

  const questionInfo: IQuestionProps = {
    size: 'large',
    text: '잘 듣고, 문장을 따라 말해 봅시다.',
  };

  const imgInfo = {
    src: '/L01/C03/A05/EE4-L01-C03-A05-P02.jpg',
    width: '467px',
    height: '394px',
    alt: '3개의 그림이 이어져 있는 이미지. 첫 번째 그림은 여자아이가 산을 오르고 있고 산에는 해님이 떠오르고 있는 모습. 두 번째 그림은 여자아이가 산 정상에 올라있고 해님과 인사 하고 있는 모습. 세 번째 그림은 여자아이가 산에서 내려가고 있고 해님도 산 뒤로 지고 있는 모습. 그 중 첫 번째 그림이 빨간 테두리로 표시된 모습',
  };

  const pageInfo = {
    pageNum: 2,
    mainKey: 2,
  };

  return (
    <EEL01C03A05P02
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

export default EE40L01C03A05P02;
