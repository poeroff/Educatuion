import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData } from './pageData';
import { IImageProps, IPageInfo } from '@/Pages/EEL10C03A08P01';
import EEL10C03A08P01 from '@/Pages/EEL10C03A08P01';
import useFile from '@/utils/fileDownLoad';

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
    src: '/L05/C03/A08/EE4-L05-C03-A08-P03.JPG',
    alt: '농구를 하고있는 학생들의 모습. 빨간 유니폼의 선수가 공을 드리블하고 있고 파란 유니폼의 선수가 따라가는 모습',
    title: '농구를 하고있는 학생들의 모습. 빨간 유니폼의 선수가 공을 드리블하고 있고 파란 유니폼의 선수가 따라가는 모습',
    width: '310px',
    height: '272px',
  };

  const text = 'Let’s play basketball.';

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

export default P03;
