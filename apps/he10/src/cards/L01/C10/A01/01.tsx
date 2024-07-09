import HE00103 from '@maidt-cntn/pages/HE-001-03';

const P01 = () => {
  const goals = [
    '대인 관계를 다룬 영화에 대한 정보를 읽고 내용을 이해할 수 있다',
    '대인 관계를 다룬 영화의 트레일러 영상을 만들 수 있다.',
  ];
  return <HE00103 goals={goals} />;
};

export default P01;
