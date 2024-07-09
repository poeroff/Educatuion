import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData } from './pageData';
import { IImageProps, IPageInfo } from '@/Pages/EEL10C03A08P01';
import EEL10C03A08P01 from '@/Pages/EEL10C03A08P01';

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
    subKey: 'RECORDER-01',
  };

  const imageInfo: IImageProps = {
    src: '/L04/C03/A08/EE4-L04-C03-A08-P05.JPG',
    alt: '말풍선이 있고, 그 위에 금지 표시가 있는 표지판',
    title: '말풍선이 있고, 그 위에 금지 표시가 있는 표지판',
    width: '480px',
    height: '272px',
  };

  const text = 'Don’t talk, please.';

  return (
    <EEL10C03A08P01
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