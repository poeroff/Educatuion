import HE00103 from '@maidt-cntn/pages/HE-001-03';

const P01 = () => {
  const goals: string[] = [
    '바람이나 소원 묻고 답하는 대화와 관심사 묻고 답하는 대화를 듣고 이해할 수 있다.',
    '바람이나 소원 묻고 답하는 대화와 관심사 묻고 답하는 대화를 할 수 있다.',
  ];

  return <HE00103 goals={goals} />;
};

export default P01;
