import EEL01C02A01P01 from '@/Pages/EEL01C02A01P01';

const CONST = {
  headerInfo: { headerText: '학습 목표' },
  question: [
    '누구인지 묻고 답하는 말을 듣고 이해하며 말할 수 있다.',
    '인물을 묘사하는 말을 듣고 이해하며 말할 수 있다.',
    '적극적인 태도로 수업에 참여할 수 있다.',
  ],
};

const P01 = () => {
  return <EEL01C02A01P01 headerInfo={CONST.headerInfo} question={CONST.question}></EEL01C02A01P01>;
};

export default P01;
