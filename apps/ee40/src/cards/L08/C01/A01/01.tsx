import EEL01C02A01P01 from '@/Pages/EEL01C02A01P01';

const CONST = {
  headerInfo: { headerText: '학습 목표' },
  question: ['가격을 묻고 답하는 말을 듣고 이해하며 말할 수 있다.', '주요 정보에 집중하여 듣고 세부 내용을 파악할 수 있다.'],
};

const P01 = () => {
  return <EEL01C02A01P01 headerInfo={CONST.headerInfo} question={CONST.question}></EEL01C02A01P01>;
};

export default P01;
