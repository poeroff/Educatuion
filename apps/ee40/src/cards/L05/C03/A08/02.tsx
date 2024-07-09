import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData } from './pageData';
import { IImageProps, IPageInfo } from '@/Pages/EEL10C03A08P01';
import EEL10C03A08P01 from '@/Pages/EEL10C03A08P01';
import useFile from '@/utils/fileDownLoad';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: "Let's write",
  };

  const questionInfo: IQuestionProps = {
    text: '문장을 세 번씩 쓰고 말해 봅시다.',
  };

  const pageInfo: IPageInfo = {
    pageNum: 2,
    mainKey: 2,
    subKey: 'RECORDER-02',
  };

  const imageInfo: IImageProps = {
    src: '/L05/C03/A08/EE4-L05-C03-A08-P02.JPG',
    alt: '야구를 하고 있는 모습. 빨간 헬멧과 야구배트를 들고 투수가 던진 공을 주시하는 타자의 모습.',
    title: '야구를 하고 있는 모습. 빨간 헬멧과 야구배트를 들고 투수가 던진 공을 주시하는 타자의 모습.',
    width: '310px',
    height: '272px',
  };

  const text = 'Let’s play baseball.';

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

export default P02;
