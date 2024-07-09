import HE00103 from '@maidt-cntn/pages/HE-001-03';

const P01 = () => {
  const goals: string[] = [
    '도움을 요청하고 감정이나 상태를 묻고 답하는 대화를 듣고 이해할 수 있다.',
    '도움을 요청하고 감정이나 상태를 묻고 답하는 대화를 할 수 있다.',
  ];

  return <HE00103 goals={goals} />;
};

export default P01;
