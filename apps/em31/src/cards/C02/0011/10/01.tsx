import CEM3102001110 from './CEM3102001110';

const P01 = () => {
  const pageKey = 'p01';

  const labelValue = 1;

  const question = '삼각형 1개로 이루어진 직각삼각형은 모두 몇 개일까요?';

  const explanation = ['예) 삼각형 1개로 이루어진 직각삼각형은 ①, ②, ③, ④로 모두 4개입니다.'];

  return <CEM3102001110 pageKey={pageKey} labelValue={labelValue} question={question} explanation={explanation} />;
};

export default P01;
