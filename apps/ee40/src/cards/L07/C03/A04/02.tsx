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
    text: 'i의 소리를 생각하며 잘 들어 봅시다.',
  };

  const pageInfo: IPageInfo = {
    pageNum: 2,
    mainKey: 2,
    subKey: 'RECORDER-0',
  };

  const imageInfo: IImageProps = {
    src: '/L07/C03/A04/EE4-L07-C03-A04-P02.JPG',
    title:
      '왼쪽에는 다양한 색과 종의 강아지 9마리와 고양이 5마리가 놀고 있는 모습, 오른쪽에는 강아지와 고양이의 주인이 강아지와 고양이의 밥을 챙겨주고 있고 아직 밥을 받지 못한 강아지들과 고양이들이 줄을 서고 있는 모습',
    alt: '왼쪽에는 다양한 색과 종의 강아지 9마리와 고양이 5마리가 놀고 있는 모습, 오른쪽에는 강아지와 고양이의 주인이 강아지와 고양이의 밥을 챙겨주고 있고 아직 밥을 받지 못한 강아지들과 고양이들이 줄을 서고 있는 모습',
    height: '271px',
  };

  const data: HighlightProps[] = [
    {
      text: 'I have nine dogs and \nfive cats.',
      highlightChar: 'i',
      color: 'red',
    },
    {
      text: 'Line up! It’s time for lunch.',
      highlightChar: 'i',
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
