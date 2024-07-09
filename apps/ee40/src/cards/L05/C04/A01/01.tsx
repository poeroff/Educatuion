import EEL01C02A01P01 from '@/Pages/EEL01C02A01P01';

const CONST = {
  headerInfo: { headerText: '학습 목표' },
  question: [
    '‘내 이름은 삐삐 롱스타킹’ 역할놀이를 하며 배운 표현을 활용할 수 있다.',
    '문제를 풀면서 이번 단원에서 배운 내용을 확인하고 정리할 수 있다.',
    '배운 내용을 스스로 점검하고 반성할 수 있다.',
  ],
};

const P01 = () => {
  return <EEL01C02A01P01 headerInfo={CONST.headerInfo} question={CONST.question}></EEL01C02A01P01>;
};

export default P01;
