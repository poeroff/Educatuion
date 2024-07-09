import HE00103 from '@maidt-cntn/pages/HE-001-03';

const P01 = () => {
  const goals = [
    '새로운 학교생활에 대한 연설을 듣고, 내용을 이해할 수 있다.',
    '신입생 대표로서 새로운 학교생활에 대한 연설을 할 수 있다.',
  ];
  return <HE00103 goals={goals} />;
};

export default P01;