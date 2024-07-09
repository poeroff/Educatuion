import HE00103 from '@maidt-cntn/pages/HE-001-03';

const P01 = () => {
  const goals = [
    '문제를 풀면서 이번 단원에서 배운 내용을 확인하고 정리할 수 있다.',
    '배운 내용을 스스로 점검하고 반성할 수 있다. ',
  ];
  return <HE00103 goals={goals} />;
};

export default P01;