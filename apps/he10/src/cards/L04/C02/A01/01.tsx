import HE00103 from '@maidt-cntn/pages/HE-001-03';

const P01 = () => {
  const goals = [
    '걱정 표현하기 표현을 듣고 이해할 수 있다.',
    '걱정 표현하기 표현을 활용하여 대화할 수 있다.',
    '제안하기 표현을 듣고 이해할 수 있다.',
    '제안하기 표현을 활용하여 대화할 수 있다.',
  ];
  return <HE00103 goals={goals} />;
};

export default P01;
