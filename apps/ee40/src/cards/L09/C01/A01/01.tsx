import EEL01C02A01P01 from '@/Pages/EEL01C02A01P01';

const CONST = {
  headerInfo: { headerText: '학습 목표' },
  question: ['물건의 위치를 묻고 답하는 말을 듣고 이해하며 말할 수 있다.', '상대방의 질문에 시각적 단서를 활용하여 답을 추측할 수 있다.'],
};

const P01 = () => {
  return <EEL01C02A01P01 headerInfo={CONST.headerInfo} question={CONST.question}></EEL01C02A01P01>;
};

export default P01;
