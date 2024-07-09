import CEM3102001110 from './CEM3102001110';

const P03 = () => {
  const pageKey = 'p03';

  const labelValue = 3;

  const question = '삼각형 4개로 이루어진 직각삼각형은 모두 몇 개일까요?';

  const explanation = ['예) 삼각형 4개로 이루어진 직각삼각형은 $①+②+③+④$로 1개입니다.'];

  return <CEM3102001110 pageKey={pageKey} labelValue={labelValue} question={question} explanation={explanation} />;
};

export default P03;
