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
    text: 'o의 소리를 생각하며 문장을 읽어 봅시다.',
  };

  const pageInfo: IPageInfo = {
    pageNum: 2,
    mainKey: 2,
    subKey: 'RECORDER-0',
  };

  const imageInfo: IImageProps = {
    src: '/L05/C03/A04/EE4-L05-C03-A04-P02.JPG',
    title:
      '왼쪽에는 아기 캥거루가 종이와 풀, 가위를 들고 있고, 엄마 캥거루는 상자를 가지고 있는 모습, 오른쪽에는 여우 모양의 상자를 자랑하고 있는 아기 캥거루와 그 상자를 보고 박수 치고 있는 엄마 캥거루의 모습',
    alt: '왼쪽에는 아기 캥거루가 종이와 풀, 가위를 들고 있고, 엄마 캥거루는 상자를 가지고 있는 모습, 오른쪽에는 여우 모양의 상자를 자랑하고 있는 아기 캥거루와 그 상자를 보고 박수 치고 있는 엄마 캥거루의 모습',
    height: '271px',
  };

  const data: HighlightProps[] = [
    {
      text: 'Mom, do you have a box?',
      highlightChar: 'o',
      color: 'red',
    },
    {
      text: 'Look! It’s a fox box!',
      highlightChar: 'o',
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
