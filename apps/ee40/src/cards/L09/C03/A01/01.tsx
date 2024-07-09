import EEL01C02A01P01 from '@/Pages/EEL01C02A01P01';

const CONST = {
  headerInfo: { headerText: '학습 목표' },
  question: [
    'br의 소리를 식별하고 소리와 철자의 관계를 이해하며 낱말을 읽을 수 있다.',
    '물건의 위치를 나타내는 어구를 읽고 의미를 이해하며 쓸 수 있다.',
    '물건의 위치를 나타내는 문장을 읽고 의미를 이해하며 쓸 수 있다.',
    '읽기·쓰기 활동에 어려움을 겪는 친구를 도우며 모둠 활동에 참여할 수 있다.',
  ],
};

const P01 = () => {
  return <EEL01C02A01P01 headerInfo={CONST.headerInfo} question={CONST.question}></EEL01C02A01P01>;
};

export default P01;
