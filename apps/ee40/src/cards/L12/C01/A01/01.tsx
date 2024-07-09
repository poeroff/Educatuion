import EEL01C02A01P01 from '@/Pages/EEL01C02A01P01';

const CONST = {
  headerInfo: { headerText: '학습 목표' },
  question: ['주말 여가 활동을 묻고 답하는 말을 듣고 이해하며 말할 수 있다.', '친구들의 취향을 존중하며 의사소통 활동에 참여할 수 있다.'],
};

const P01 = () => {
  return <EEL01C02A01P01 headerInfo={CONST.headerInfo} question={CONST.question}></EEL01C02A01P01>;
};

export default P01;
