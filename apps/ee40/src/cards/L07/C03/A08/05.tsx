import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData } from './pageData';
import { IImageProps, IPageInfo } from '@/Pages/EEL10C03A08P01';
import EEL10C03A08P01 from '@/Pages/EEL10C03A08P01';
import useFile from '@/utils/fileDownLoad';

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
    src: '/L07/C03/A08/EE4-L07-C03-A08-P05.JPG',
    alt: '무드등을 켜고 침대에 누워 잠든 아이의 모습',
    title: '무드등을 켜고 침대에 누워 잠든 아이의 모습',
    width: '310px',
    height: '272px',
  };

  const text = 'It’s time for bed.';

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
