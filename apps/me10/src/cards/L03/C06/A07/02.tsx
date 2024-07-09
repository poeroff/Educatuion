import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'We Have a Cat on Our Team! (4)',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: '해석을 확인해 봅시다.',
  };

  const data: IListenAndAnswer[] = [
    {
      originText: 'Then, Cathy jumped into the air and got the ball.',
      translation: '그때, Cathy가 공중으로 뛰어올라서 공을 잡았다.',
    },
    {
      originText: 'She quickly passed it over.',
      translation: '그녀는 재빨리 공을 넘겨 주었다.',
    },
    {
      originText: '“Wow, Cathy!',
      translation: '“우아, Cathy!',
    },
    {
      originText: 'How did you do that?” The dogs were surprised.',
      translation: '그것을 어떻게 했니?” 개들은 놀랐다.',
    },
  ];

  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} data={data} />;
};

export default P02;
