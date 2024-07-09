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
    text: 'i의 소리를 생각하며 문장을 읽어 봅시다.',
  };

  const pageInfo: IPageInfo = {
    pageNum: 2,
    mainKey: 2,
    subKey: 'RECORDER-0',
  };

  const imageInfo: IImageProps = {
    src: '/L02/C03/A04/EE4-L02-C03-A04-P02.JPG',
    title:
      '왼쪽에는 배 위에서 낚시하고 있는 남매 앞에 큰 물고기가 나타나 여자아이가 놀라 일어서는 모습, 오른쪽에는 일어선 여자아이가 물에 빠질 위험에 처해 남자아이가 말리는 모습',
    alt: '왼쪽에는 배 위에서 낚시하고 있는 남매 앞에 큰 물고기가 나타나 여자아이가 놀라 일어서는 모습, 오른쪽에는 일어선 여자아이가 물에 빠질 위험에 처해 남자아이가 말리는 모습',
    height: '279px',
  };

  const data: HighlightProps[] = [
    {
      text: 'The fish is big, big, big!',
      highlightChar: 'i',
      color: 'red',
    },
    {
      text: 'Sister! Sit, sit, sit down.',
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
