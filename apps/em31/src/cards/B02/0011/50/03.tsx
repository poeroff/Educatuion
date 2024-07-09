import BEM3102001150 from './BEM3102001150';

const P03 = () => {
  const pageKey = 'p03';

  const labelValue = 3;

  const question = '선분 ㄴㄹ의 길이는 몇 cm일까요?';

  const explanation = ['예) 선분 ㄴㄹ의 길이는 선분 ㄴㄷ의 길이와 선분 ㄷㄹ의 길이의 합이므로 $13+8=21$ (cm)입니다.'];

  return <BEM3102001150 pageKey={pageKey} labelValue={labelValue} question={question} explanation={explanation} />;
};

export default P03;
