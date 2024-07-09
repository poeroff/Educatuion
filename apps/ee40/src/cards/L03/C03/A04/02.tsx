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
    text: 'u의 소리를 생각하며 문장을 읽어 봅시다.',
  };

  const pageInfo: IPageInfo = {
    pageNum: 2,
    mainKey: 2,
    subKey: 'RECORDER-0',
  };

  const imageInfo: IImageProps = {
    src: '/L03/C03/A04/EE4-L03-C03-A04-P02.JPG',
    title: '왼쪽에는 토끼가 신나하며 달리는 모습, 오른쪽에는 화난 표정의 코끼리가 컵 위에 앉은 토끼를 바라보고 있는 모습',
    alt: '왼쪽에는 토끼가 신나하며 달리는 모습, 오른쪽에는 화난 표정의 코끼리가 컵 위에 앉은 토끼를 바라보고 있는 모습',
    height: '277px',
  };

  const data: HighlightProps[] = [
    {
      text: 'I can run. it’s fun.',
      highlightChar: 'u',
      color: 'red',
    },
    {
      text: 'Stand up. It’s my cup.',
      highlightChar: 'u',
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
