import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData } from './pageData';
import { IImageProps, IPageInfo } from '@/Pages/EEL10C03A08P01';
import EEL10C03A08P01 from '@/Pages/EEL10C03A08P01';
import useFile from '@/utils/fileDownLoad';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: "Let's write",
  };

  const questionInfo: IQuestionProps = {
    text: '문장을 세 번씩 쓰고 말해 봅시다.',
  };

  const pageInfo: IPageInfo = {
    pageNum: 1,
    mainKey: 1,
    subKey: 'RECORDER-01',
  };

  const imageInfo: IImageProps = {
    src: '/L05/C03/A08/EE4-L05-C03-A08-P01.JPG',
    alt: '축구를 하고 있는 세 명의 학생. 빨간 유니폼의 학생이 공을 잡고 있고 파란 유니폼의 두 선수가 막아 서는 모습',
    title: '축구를 하고 있는 세 명의 학생. 빨간 유니폼의 학생이 공을 잡고 있고 파란 유니폼의 두 선수가 막아 서는 모습',
    width: '310px',
    height: '272px',
  };

  const text = 'Let’s play soccer.';

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

export default P01;
