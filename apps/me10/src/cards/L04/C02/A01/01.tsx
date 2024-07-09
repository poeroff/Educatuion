import HE00103 from '@maidt-cntn/pages/HE-001-03';

const P01 = () => {
  const goals: string[] = [
    '길 묻고 답하는 대화와 희망 또는 기대를 표현하는 대화를 듣고 이해할 수 있다.',
    '길 묻고 답하는 대화와 희망 또는 기대를 표현하는 대화를 할 수 있다.',
  ];

  return <HE00103 goals={goals} />;
};

export default P01;
