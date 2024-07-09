import EEL01C02A01P01 from '@/Pages/EEL01C02A01P01';

const CONST = {
  headerInfo: { headerText: '학습 목표' },
  question: [
    'i의 소리를 식별하고 소리와 철자의 관계를 이해하며 낱말을 읽을 수 있다.',
    '일과를 나타내는 어구를 읽고 의미를 이해하며 쓸 수 있다.',
    '일과를 나타내는 문장을 읽고 의미를 이해하며 쓸 수 있다.',
    '새로운 내용을 학습할 때 이전에 배운 내용과 연결하여 학습할 수 있다.',
  ],
};

const P01 = () => {
  return <EEL01C02A01P01 headerInfo={CONST.headerInfo} question={CONST.question}></EEL01C02A01P01>;
};

export default P01;
