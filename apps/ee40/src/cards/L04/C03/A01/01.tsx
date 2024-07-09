import EEL01C02A01P01 from '@/Pages/EEL01C02A01P01';

const CONST = {
  headerInfo: { headerText: '학습 목표' },
  question: [
    'e의 소리를 식별하고 소리와 철자의 관계를 이해하며 낱말을 읽을 수 있다.',
    '동작을 나타내는 낱말을 읽고 의미를 이해하며 쓸 수 있다.',
    '금지하는 문장을 읽고 의미를 이해하며 쓸 수 있다.',
    '바른 자세와 글씨로 낱말을 쓸 수 있다.',
  ],
};

const P01 = () => {
  return <EEL01C02A01P01 headerInfo={CONST.headerInfo} question={CONST.question}></EEL01C02A01P01>;
};

export default P01;
