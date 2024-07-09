//Page: EE4-L12-C03-A04-P02

import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { getCorrectData, getDefaultData } from '@/cards/L01/C03/A04/pageData';
import useFile from '@/utils/fileDownLoad';
import EEL01C03A04P02 from '@/Pages/EEL01C03A04P02';
import { IImageProps, HighlightProps, IPageInfo } from '@/Pages/EEL01C03A04P02';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Sounds and Letters 3',
  };

  const questionInfo: IQuestionProps = {
    text: 'th의 소리를 생각하며 문장을 읽어 봅시다.',
  };

  const pageInfo: IPageInfo = {
    pageNum: 2,
    mainKey: 2,
    subKey: 'RECORDER-0',
  };

  const imageInfo: IImageProps = {
    src: '/L12/C03/A04/EE4-L12-C03-A04-P02.JPG',
    title: '왼쪽에는 3개의 토마토 열매가 열린 나무에 물을 주고 있는 아이들의 모습, 오른쪽에는 30',
    alt: '왼쪽에는 3개의 토마토 열매가 열린 나무에 물을 주고 있는 아이들의 모습, 오른쪽에는 30',
    height: '271px',
  };

  const data: HighlightProps[] = [
    {
      text: 'It’s Wednesday today. Three tomatoes.',
      highlightChar: 'Th',
      color: 'red',
    },
    {
      text: 'It’s Thursday today. Thirty tomatoes!',
      highlightChar: 'Th',
      color: 'red',
    },
  ];

  return (
    <EEL01C03A04P02
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
