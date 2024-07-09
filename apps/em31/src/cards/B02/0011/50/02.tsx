import BEM3102001150 from './BEM3102001150';

const P02 = () => {
  const pageKey = 'p02';

  const labelValue = 2;

  const question = '선분 ㄷㄹ의 길이는 몇 cm일까요?';

  const explanation = [
    '예) 선분 ㅅㄷ의 길이는 13 cm이므로 선분 ㅂㄷ의 길이는 $13-5=8$ (cm)입니다.',
    '정사각형은 네 변의 길이가 같으므로 선분 ㄷㄹ의 길이는 선분 ㅂㄷ의 길이와 같습니다.',
    '따라서 선분 ㄷㄹ의 길이는 8 cm입니다.',
  ];

  return <BEM3102001150 pageKey={pageKey} labelValue={labelValue} question={question} explanation={explanation} />;
};

export default P02;
