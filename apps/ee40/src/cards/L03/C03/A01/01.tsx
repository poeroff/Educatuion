import EEL01C02A01P01 from '@/Pages/EEL01C02A01P01';

const CONST = {
  headerInfo: { headerText: '학습 목표' },
  question: [
    'u의 소리를 식별하고 소리와 철자의 관계를 이해하며 낱말을 읽을 수 있다.',
    '나의 주변 인물을 나타내는 낱말을 읽고 의미를 이해하며 쓸 수 있다.',
    '누구인지 나타내는 문장을 읽고 의미를 이해하며 쓸 수 있다.',
    '소리와 철자의 관계에서 규칙을 찾아 낱말을 읽을 수 있다.',
  ],
};

const P01 = () => {
  return <EEL01C02A01P01 headerInfo={CONST.headerInfo} question={CONST.question}></EEL01C02A01P01>;
};

export default P01;
