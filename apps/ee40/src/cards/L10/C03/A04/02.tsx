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
    text: 'sh의 소리를 생각하며 문장을 읽어 봅시다.',
  };

  const pageInfo: IPageInfo = {
    pageNum: 2,
    mainKey: 2,
    subKey: 'RECORDER-0',
  };

  const imageInfo: IImageProps = {
    src: '/L10/C03/A04/EE4-L10-C03-A04-P02.JPG',
    title:
      '왼쪽에는 개구리가 자판기에서 물고기 모양 신발을 얻고 놀라 하는 모습, 오른쪽에는 개구리가 자판기에서 물고기가 그려진 셔츠를 얻고 기뻐하는 모습',
    alt: '왼쪽에는 개구리가 자판기에서 물고기 모양 신발을 얻고 놀라 하는 모습, 오른쪽에는 개구리가 자판기에서 물고기가 그려진 셔츠를 얻고 기뻐하는 모습',
    height: '271px',
  };

  const data: HighlightProps[] = [
    {
      text: 'I have a fish shoe.',
      highlightChar: 'sh',
      color: 'red',
    },
    {
      text: 'I have a fish shirt.',
      highlightChar: 'sh',
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
