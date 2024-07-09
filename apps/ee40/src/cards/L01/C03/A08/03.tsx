import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData } from '@/cards/L01/C03/A08/pageData';
import EEL01C03A08P01, { IImageProps, IPageInfo } from '@/Pages/EEL01C03A08P01';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: "Let's write",
  };

  const questionInfo: IQuestionProps = {
    text: '문장을 세 번씩 쓰고 말해 봅시다.',
  };

  const pageInfo: IPageInfo = {
    pageNum: 3,
    mainKey: 3,
    subKey: 'RECORDER-03',
  };

  const imageInfo: IImageProps = {
    src: '/L01/C03/A08/EE4-L01-C03-A08-P03.png',
    alt: '해가 밝게 떠오르는 자연 배경 앞에 미소를 지으며 손을 들고 있는 남자아이',
    title: '해가 밝게 떠오르는 자연 배경 앞에 미소를 지으며 손을 들고 있는 남자아이',
    width: '480px',
    height: '272px',
  };

  const text = 'Good morning.';

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

export default P03;
