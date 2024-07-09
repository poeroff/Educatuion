import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'What’s in Your School Survival Kit? (2)',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: '해석을 확인해 봅시다.',
  };

  const data: IListenAndAnswer[] = [
    {
      originText: 'This box is my school survival kit.',
      translation: '이 상자는 저의 학교 생존 키트예요.',
    },
    {
      originText: 'I have many things in it.',
      translation: '저는 이 안에 많은 것을 가지고 있답니다.',
    },
    {
      originText: 'First, I have some sticky notes.',
      translation: '첫째로, 붙임쪽지가 있어요. ',
    },
    {
      originText: 'I use them on the first day.',
      translation: '저는 그것들을 첫날에 사용한답니다.',
    },
    {
      originText: 'I write your names and remember them.',
      translation: '여러분의 이름을 적어서 기억해요. ',
    },
    {
      originText: 'Next, I have some candies.',
      translation: '다음으로 사탕이 있어요. ',
    },
    {
      originText: 'These are for you.',
      translation: '이것들은 여러분을 위한 거예요. ',
    },
    {
      originText: 'They’re sweet, like your smiles.',
      translation: '그것들은 여러분의 미소처럼 달콤하답니다.',
    },
  ];

  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} data={data} />;
};

export default P03;
