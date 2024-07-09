import CEM3102001110 from './CEM3102001110';

const P04 = () => {
  const pageKey = 'p04';

  const labelValue = 4;

  const question = '크고 작은 직각삼각형은 모두 몇 개일까요?';

  const explanation = ['예) 크고 작은 직각삼각형은 $4+2+1=7$(개)입니다.'];

  const showBottomSheetImg = false;

  return (
    <CEM3102001110 pageKey={pageKey} labelValue={labelValue} question={question} explanation={explanation} showBottomSheetImg={showBottomSheetImg} />
  );
};

export default P04;
