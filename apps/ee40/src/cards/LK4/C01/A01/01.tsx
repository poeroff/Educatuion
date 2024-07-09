import EEL01C02A01P01 from '@/Pages/EEL01C02A01P01';

const CONST = {
  headerInfo: { headerText: '학습 목표' },
  question: ['10~12단원에서 배운 낱말과 표현을 이용하여 프로젝트 활동을 할 수 있다.', '동아리의 특성이 잘 나타나는 개성있는 포스터를 만들 수 있다.'],
};

const P01 = () => {
  return <EEL01C02A01P01 headerInfo={CONST.headerInfo} question={CONST.question}></EEL01C02A01P01>;
};

export default P01;
