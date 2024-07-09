import HE00103 from '@maidt-cntn/pages/HE-001-03';

const P01 = () => {
  const goals = ['영상을 보고 읽기 본문의 주제를 추측할 수 있다.', '본문에 등장할 어휘의 뜻을 이해할 수 있다.'];

  return <HE00103 goals={goals} />;
};

export default P01;