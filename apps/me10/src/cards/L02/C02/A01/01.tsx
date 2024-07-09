import HE00103 from '@maidt-cntn/pages/HE-001-03';

const P01 = () => {
  const goals: string[] = [
    '날씨를 묻고 답하는 대화와 행동을 묘사하는 말을 듣고 이해할 수 있다.',
    '날씨를 묻고 답하는 대화를 하고 행동을 묘사하는 말을 할 수 있다.',
  ];

  return <HE00103 goals={goals} />;
};

export default P01;
