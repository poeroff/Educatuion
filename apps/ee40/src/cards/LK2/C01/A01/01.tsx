import EEL01C02A01P01 from '@/Pages/EEL01C02A01P01';

const CONST = {
  headerInfo: { headerText: '학습 목표' },
  question: [
    '4~6단원에서 배운 낱말과 표현을 이용하여 프로젝트 활동을 할 수 있다.',
    '낱말을 나타내는 다양한 이미지를 떠올려 보고, 그림 글자를 만들 수 있다.',
  ],
};

const P01 = () => {
  return <EEL01C02A01P01 headerInfo={CONST.headerInfo} question={CONST.question}></EEL01C02A01P01>;
};

export default P01;
