import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData } from '@/cards/L01/C04/A07/pageData';
import EEL01C04A07P01, { IImageProps, IPageInfo, IData, IBubbleTextProps } from '@/Pages/EEL01C04A07P01';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Review 4',
  };

  const questionInfo: IQuestionProps = {
    text: '질문에 알맞은 응답을 <보기>에서 골라 영어 노트 위에 쓰고, 그 이유를 자유롭게 말해 봅시다.',
  };

  const imageInfo: IImageProps = {
    src: '/L01/C04/A07/EE4-L01-C04-A07-P01.png',
    alt: '영상 통화를 하고 있는 모습으로, 활짝 웃으며 만세를 하고 있는 남자아이에게 How are you?라고 묻는 여자아이 모습',
    title: '영상 통화를 하고 있는 모습으로, 활짝 웃으며 만세를 하고 있는 남자아이에게 How are you?라고 묻는 여자아이 모습',
    width: '404px',
    height: '272px',
  };

  const pageInfo: IPageInfo = {
    pageNum: 1,
    mainKey: 1,
    subKey: 'RECORDER-01',
  };

  const audioSrc = '/L01/C04/A07/EE4-L01-C04-A07-P01.mp3';

  const data: IData[] = [{ text: "I'm good." }, { text: "I'm great." }];

  const bubbleText: IBubbleTextProps = {
    text: 'How are you?',
    top: '-4%',
    left: '0%',
  };

  return (
    <EEL01C04A07P01
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      imageInfo={imageInfo}
      pageInfo={pageInfo}
      audioSrc={audioSrc}
      data={data}
      bubbleText={bubbleText}
      getCorrectData={getCorrectData}
      getDefaultData={getDefaultData}
    />
  );
};

export default P01;
