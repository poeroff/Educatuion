import EEL01C02A01P01 from '@/Pages/EEL01C02A01P01';

const CONST = {
  headerInfo: { headerText: '학습 목표' },
  question: [
    '제안하고 답하는 말을 듣고 이해하며 말할 수 있다.',
    '거절의 이유를 나타내는 말을 듣고 이해하며 말할 수 있다.',
    '친구의 제안에 거절의 이유를 말하며 친절하게 답할 수 있다.',
  ],
};

const P01 = () => {
  return <EEL01C02A01P01 headerInfo={CONST.headerInfo} question={CONST.question}></EEL01C02A01P01>;
};

export default P01;