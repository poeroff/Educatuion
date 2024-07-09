import EEL01C02A01P01 from '@/Pages/EEL01C02A01P01';

const CONST = {
  headerInfo: { headerText: '학습 목표' },
  question: [
    'ch의 소리를 식별하고 소리와 철자의 관계를 이해하며 낱말을 읽을 수 있다.',
    '물건을 나타내는 낱말을 읽고 의미를 이해하며 쓸 수 있다.',
    '원하는 것을 나타내는 문장을 읽고 의미를 이해하며 쓸 수 있다.',
    '이중자음을 하나의 음가로 발음할 수 있다. ',
  ],
};

const P01 = () => {
  return <EEL01C02A01P01 headerInfo={CONST.headerInfo} question={CONST.question}></EEL01C02A01P01>;
};

export default P01;
