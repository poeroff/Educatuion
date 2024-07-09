import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData } from '@/cards/L01/C03/A08/pageData';
import EEL01C03A08P01, { IImageProps, IPageInfo } from '@/Pages/EEL01C03A08P01';

const P05 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: "Let's write",
  };

  const questionInfo: IQuestionProps = {
    text: '문장을 세 번씩 쓰고 말해 봅시다.',
  };

  const pageInfo: IPageInfo = {
    pageNum: 5,
    mainKey: 5,
    subKey: 'RECORDER-05',
  };

  const imageInfo: IImageProps = {
    src: '/L01/C03/A08/EE4-L01-C03-A08-P05.png',
    alt: '해가 저물며 노을이 지는 자연 배경 앞에 웃으며 손을 들고 있는 여자아이',
    title: '해가 저물며 노을이 지는 자연 배경 앞에 웃으며 손을 들고 있는 여자아이',
    width: '480px',
    height: '272px',
  };

  const text = 'Good evening.';

  return (
    <EEL01C03A08P01
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      pageInfo={pageInfo}
      imageInfo={imageInfo}
      text={text}
      getCorrectData={getCorrectData}
      getDefaultData={getDefaultData}
    />
  );
};

export default P05;
