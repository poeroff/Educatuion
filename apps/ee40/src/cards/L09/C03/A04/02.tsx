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
    text: 'br의 소리를 생각하며 문장을 읽어 봅시다.',
  };

  const pageInfo: IPageInfo = {
    pageNum: 2,
    mainKey: 2,
    subKey: 'RECORDER-0',
  };

  const imageInfo: IImageProps = {
    src: '/L09/C03/A04/EE4-L09-C03-A04-P02.JPG',
    title:
      '왼쪽에는 가방 속에서 붓을 찾고 있는 여자아이의 모습, 오른쪽에는 여자아이가 찾던 붓을 그 아이의 남동생이 먹고 있는 모습과 화가 난 표정의 여자아이 모습',
    alt: '왼쪽에는 가방 속에서 붓을 찾고 있는 여자아이의 모습, 오른쪽에는 여자아이가 찾던 붓을 그 아이의 남동생이 먹고 있는 모습과 화가 난 표정의 여자아이 모습',
    height: '271px',
  };

  const data: HighlightProps[] = [
    {
      text: 'Where is my brown brush?',
      highlightChar: 'br',
      color: 'red',
    },
    {
      text: 'My brother is eating my brush!',
      highlightChar: 'br',
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
