import EEL01C02A01P01 from '@/Pages/EEL01C02A01P01';

const CONST = {
  headerInfo: { headerText: '학습 목표' },
  question: [
    'o의 소리를 식별하고 소리와 철자의 관계를 이해하며 낱말을 읽을 수 있다.',
    '운동을 나타내는 어구를 읽고 의미를 이해하며 쓸 수 있다.',
    '운동을 제안하는 문장을 읽고 의미를 이해하며 쓸 수 있다.',
    '호기심과 흥미를 갖고 쓰기에 적극 참여할 수 있다.',
  ],
};

const P01 = () => {
  return <EEL01C02A01P01 headerInfo={CONST.headerInfo} question={CONST.question}></EEL01C02A01P01>;
};

export default P01;
