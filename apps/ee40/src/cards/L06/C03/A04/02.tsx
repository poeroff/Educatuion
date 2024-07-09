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
    text: 'a의 소리를 생각하며 문장을 읽어 봅시다.',
  };

  const pageInfo: IPageInfo = {
    pageNum: 2,
    mainKey: 2,
    subKey: 'RECORDER-0',
  };

  const imageInfo: IImageProps = {
    src: '/L06/C03/A04/EE4-L06-C03-A04-P02.JPG',
    title: '왼쪽에는 Jake라는 이름을 가진 남자아이가 케이크를 만들 준비를 하고 있는 모습, 오른쪽에는 남자아이가 케이크 위에 크림을 짜는 모습',
    alt: '왼쪽에는 Jake라는 이름을 가진 남자아이가 케이크를 만들 준비를 하고 있는 모습, 오른쪽에는 남자아이가 케이크 위에 크림을 짜는 모습',
    height: '271px',
  };

  const data: HighlightProps[] = [
    {
      text: 'My name is Jake.',
      highlightChar: 'a',
      color: 'red',
    },
    {
      text: 'Let’s make a cake.',
      highlightChar: 'a',
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