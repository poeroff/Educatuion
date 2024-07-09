//Page: EE4-L04-C03-A04-P02

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
    text: 'e의 소리를 생각하며 문장을 읽어 봅시다.',
  };

  const pageInfo: IPageInfo = {
    pageNum: 2,
    mainKey: 2,
    subKey: 'RECORDER-0',
  };

  const imageInfo: IImageProps = {
    src: '/L04/C03/A04/EE4-L04-C03-A04-P02.JPG',
    title: '왼쪽에는 빨간 물감이 묻은 붓과 파렛트를 들고 있는 무당 벌레가 노란색 침대, 계란, 초록색 헬멧, 노란색 종이 있는 방에 들어간 모습, 오른쪽에는 빨간 물감이 묻은 붓과 파렛트를 들고 있는 무당 벌레가 침대, 계란, 헬멧, 그리고 종을 모두 빨간색으로 칠한 모습',
    alt: '왼쪽에는 빨간 물감이 묻은 붓과 파렛트를 들고 있는 무당 벌레가 노란색 침대, 계란, 초록색 헬멧, 노란색 종이 있는 방에 들어간 모습, 오른쪽에는 빨간 물감이 묻은 붓과 파렛트를 들고 있는 무당 벌레가 침대, 계란, 헬멧, 그리고 종을 모두 빨간색으로 칠한 모습',
    height: '271px',
  };

  const data: HighlightProps[] = [
    {
      text: 'I like red.',
      highlightChar: 'e',
      color: 'red',
    },
    {
      text: 'A red bed, a red egg, and a red helmet!',
      highlightChar: 'e',
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
