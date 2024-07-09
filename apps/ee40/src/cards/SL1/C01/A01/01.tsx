import EEL01C02A01P01 from '@/Pages/EEL01C02A01P01';

const CONST = {
  headerInfo: { headerText: '학습 목표' },
  question: [
    '알파벳을 찾아 소리 내어 읽고 따라 쓸 수 있다.',
    '교실 영어 찬트를 따라 하고 우리 교실의 규칙을 만들 수 있다.',
    '선생님과 친구들을 배려하고 존중하는 태도로 수업에 참여할 수 있다.',
  ],
};

const P01 = () => {
  return <EEL01C02A01P01 headerInfo={CONST.headerInfo} question={CONST.question}></EEL01C02A01P01>;
};

export default P01;
