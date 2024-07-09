import EEL01C02A01P01 from '@/Pages/EEL01C02A01P01';

const CONST = {
  headerInfo: { headerText: '학습 목표' },
  question: [
    '상대방이 지금 하고 있는 행동을 묻고 답하는 말을 듣고 이해하며 말할 수 있다.',
    '활동에 적극 참여하고 새로운 표현을 반복해서 연습할 수 있다.',
  ],
};

const P01 = () => {
  return <EEL01C02A01P01 headerInfo={CONST.headerInfo} question={CONST.question}></EEL01C02A01P01>;
};

export default P01;
