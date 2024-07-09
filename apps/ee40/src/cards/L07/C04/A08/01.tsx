import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData } from '@/cards/L01/C04/A08/pageData';
import EEL01C04A08P01, { IPageInfo, IQuestionData } from '@/Pages/EEL01C04A08P01';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Yes, I Can',
  };

  const questionInfo: IQuestionProps = {
    text: '이 단원에서 배운 내용을 스스로 확인해 봅시다.',
  };

  const pageInfo: IPageInfo = {
    pageNum: 1,
    mainKey: 1,
    subKey: 'TEXT-0',
  };

  const data: IQuestionData[] = [
    {
      text: '시각을 묻고 답하는 말을 이해하고 표현할 수 있어요.',
      score: 0,
    },
    {
      text: '무엇을 할 시간인지 나타내는 말을 이해하고 표현할 수 있어요.',
      score: 0,
    },
    {
      text: 'time의 i 소리를 읽고 쓸 수 있어요.',
      score: 0,
    },
    {
      text: undefined,
      score: 0,
    },
  ];

  return (
    <EEL01C04A08P01
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      pageInfo={pageInfo}
      data={data}
      getCorrectData={getCorrectData}
      getDefaultData={getDefaultData}
    />
  );
};

export default P01;
