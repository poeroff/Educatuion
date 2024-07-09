import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'We Have a Cat on Our Team! (5)',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: '해석을 확인해 봅시다.',
  };

  const data: IListenAndAnswer[] = [
    {
      originText: 'After the game, everyone talked about Cathy.',
      translation: '경기 후에, 모두가 Cathy에 대해 이야기했다.',
    },
    {
      originText: '“We have a cat on our team now.',
      translation: '“이제 우리 팀에 고양이가 있어요.',
    },
    {
      originText: ' I’m so glad!” said Max.',
      translation: '저는 무척 기뻐요!” Max가 말했다.',
    },
    {
      originText: '“Great!”',
      translation: '“좋구나!”',
    },
    {
      originText: 'Coach Biscuit said, “We have another new member.”',
      translation: 'Biscuit 코치가 말했다. “우리에게 또 다른 새 멤버가 있단다.”',
    },
    {
      originText: '“A dog or a cat?”',
      translation: '“개예요 아니면 고양이예요?”',
    },
    {
      originText: 'Everyone got excited.',
      translation: '모두가 흥분했다.',
    },
    {
      originText: '“Cookie!',
      translation: '“Cookie!',
    },
    {
      originText: 'Please come out.”',
      translation: '나오세요.”',
    },
    {
      originText: 'Coach Biscuit called out to the new member.',
      translation: 'Biscuit 코치가 새 멤버에게 외쳤다.',
    },
  ];

  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} data={data} />;
};

export default P03;
