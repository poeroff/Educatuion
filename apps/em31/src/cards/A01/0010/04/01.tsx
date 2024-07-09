import EM01201 from '@maidt-cntn/math/pages/EM-012-01';

const P01 = () => {
  const title = '다음 시간에 배울 내용';
  const goal = { text: '문제로 마무리' };
  return <EM01201 mainTitleHeaderInfo={{ pattern: 'text' }} title={title} goal={goal} />;
};

export default P01;
