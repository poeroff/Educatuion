import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { getCorrectData, getDefaultData } from '@/cards/L01/C03/A04/pageData';
import useFile from '@/utils/fileDownLoad';
import EEL02C03A04P02 from '@/Pages/EEL02C03A04P02';
import { IImageProps, HighlightProps, IPageInfo } from '@/Pages/EEL02C03A04P02';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Sounds and Letters 3',
  };
  const questionInfo: IQuestionProps = {
    text: 'ch의 소리를 생각하며 문장을 읽어 봅시다.',
  };

  const pageInfo: IPageInfo = {
    pageNum: 2,
    mainKey: 2,
    subKey: 'RECORDER-0',
  };

  const imageInfo: IImageProps = {
    src: '/L08/C03/A04/EE4-L08-C03-A04-P02.JPG',
    title:
      '왼쪽에는 초콜릿으로 만들어진 의자와 과자로 만들어진 집을 손가락으로 가리키는 남자아이의 모습, 오른쪽에는 초콜렛 의자를 먹고 있는 남자아이의 모습',
    alt: '왼쪽에는 초콜릿으로 만들어진 의자와 과자로 만들어진 집을 손가락으로 가리키는 남자아이의 모습, 오른쪽에는 초콜렛 의자를 먹고 있는 남자아이의 모습',
    height: '271px',
  };

  const data: HighlightProps[] = [
    {
      text: 'Look! That is a chocolate chair.',
      highlightChar: 'ch',
      color: 'red',
    },
    {
      text: 'My lunch is chocolate.',
      highlightChar: 'ch',
      color: 'red',
    },
  ];

  return (
    <EEL02C03A04P02
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      imageInfo={imageInfo}
      pageInfo={pageInfo}
      data={data}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
    />
  );
};

export default P02;
