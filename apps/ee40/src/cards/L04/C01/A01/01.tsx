import EEL01C02A01P01 from '@/Pages/EEL01C02A01P01';

const CONST = {
  headerInfo: { headerText: '학습 목표' },
  question: ['금지하는 말을 듣고 이해하며 말할 수 있다.', '금지하는 말을 듣고 상황에 맞게 수용하거나 사과하는 말을 할 수 있다.'],
};

const P01 = () => {
  return <EEL01C02A01P01 headerInfo={CONST.headerInfo} question={CONST.question}></EEL01C02A01P01>;
};

export default P01;
