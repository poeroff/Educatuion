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
    src: '/L03/C03/A08/EE4-L03-C03-A08-P02.JPG',
    alt: '남자아이가 벤치에 앉아 계시는 할아버지를 뒤에서 끌어안고 있는 모습, 할아버지를 가리키는 화살표',
    title: '남자아이가 벤치에 앉아 계시는 할아버지를 뒤에서 끌어안고 있는 모습, 할아버지를 가리키는 화살표',
    width: '310px',
    height: '272px',
  };

  const text = 'He’s my grandpa.';

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
