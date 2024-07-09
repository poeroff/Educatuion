import EEL01C02A01P01 from '@/Pages/EEL01C02A01P01';

const CONST = {
  headerInfo: { headerText: '학습 목표' },
  question: [
    'th의 소리를 식별하고 소리와 철자의 관계를 이해하며 낱말을 읽을 수 있다.',
    '여가 활동을 나타내는 어구를 읽고 의미를 이해하며 쓸 수 있다.',
    '여가 활동을 나타내는 문장을 읽고 의미를 이해하며 쓸 수 있다.',
    '음성 언어와 문자 언어를 통합하여 자연스럽게 사용할 수 있다.',
  ],
};

const P01 = () => {
  return <EEL01C02A01P01 headerInfo={CONST.headerInfo} question={CONST.question}></EEL01C02A01P01>;
};

export default P01;
