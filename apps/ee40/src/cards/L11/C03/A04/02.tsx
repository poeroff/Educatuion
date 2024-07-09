//Page: EE4-L11-C03-A04-P02

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
    text: 'cl의 소리를 생각하며 문장을 읽어 봅시다.',
  };

  const pageInfo: IPageInfo = {
    pageNum: 2,
    mainKey: 2,
    subKey: 'RECORDER-0',
  };

  const imageInfo: IImageProps = {
    src: '/L11/C03/A04/EE4-L11-C03-A04-P02.JPG',
    title: '왼쪽에는 더러워져 울고 있는 구름 모양의 시계를 청소하기 위해 아이들이 청소도 구를 들고 준비하는 모습, 오른쪽에는 깨끗해져 활짝 웃는 구름 모양의 시계를 보고 기뻐하는 아이들의 모습',
    alt: '왼쪽에는 더러워져 울고 있는 구름 모양의 시계를 청소하기 위해 아이들이 청소도 구를 들고 준비하는 모습, 오른쪽에는 깨끗해져 활짝 웃는 구름 모양의 시계를 보고 기뻐하는 아이들의 모습',
    height: '271px',
  };

  const data: HighlightProps[] = [
    {
      text: 'The cloud clock is sad. Let’s clean.',
      highlightChar: 'cl',
      color: 'red',
    },
    {
      text: 'The cloud clock is happy now.',
      highlightChar: 'cl',
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
