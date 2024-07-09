import EEL01C02A01P01 from '@/Pages/EEL01C02A01P01';

const CONST = {
  headerInfo: { headerText: '학습 목표' },
  question: [
    '가격을 묻고 답하는 말을 듣고 이해하며 말할 수 있다.',
    '원하는 것을 나타내는 말을 듣고 이해하며 말할 수 있다.',
    '배운 표현을 실생활에서 자신 있게 사용할 수 있다.',
  ],
};

const P01 = () => {
  return <EEL01C02A01P01 headerInfo={CONST.headerInfo} question={CONST.question}></EEL01C02A01P01>;
};

export default P01;
