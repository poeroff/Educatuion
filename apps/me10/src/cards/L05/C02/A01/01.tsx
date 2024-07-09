import HE00103 from '@maidt-cntn/pages/HE-001-03';

const P01 = () => {
  const goals: string[] = [
    '계획 묻고 답하는 대화와 제안하고 답하는 대화를 듣고 이해할 수 있다.',
    '계획 묻고 답하는 대화와 제안하고 답하는 대화를 할 수 있다.',
  ];

  return <HE00103 goals={goals} />;
};

export default P01;
