import BEM3102001150 from './BEM3102001150';

const P01 = () => {
  const pageKey = 'p01';

  const labelValue = 1;

  const question = '선분 ㄴㄷ의 길이는 몇 cm일까요?';

  const explanation = [
    '예) 정사각형은 네 변의 길이가 모두 같으므로 선분 ㄴㄷ의 길이는 선분 ㄱㄴ의 길이와 같습니다. 따라서 선분 ㄴㄷ의 길이는 13cm입니다.',
  ];

  return <BEM3102001150 pageKey={pageKey} labelValue={labelValue} question={question} explanation={explanation} />;
};

export default P01;
