import EEL01C02A01P01 from '@/Pages/EEL01C02A01P01';

const CONST = {
  headerInfo: { headerText: '학습 목표' },
  question: [
    '3학년에서 배운 주요 낱말과 의사소통 기능을 이해하고 표현할 수 있다.',
    '배운 표현을 이용하여 자신과 친구의 소개표를 작성할 수 있다.',
    '듣는 사람이 나의 말을 잘 이해하게 배려하며 자신을 소개할 수 있다.',
  ],
};

const P01 = () => {
  return <EEL01C02A01P01 headerInfo={CONST.headerInfo} question={CONST.question}></EEL01C02A01P01>;
};

export default P01;
