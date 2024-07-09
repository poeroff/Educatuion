import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import EEL01C02A01P01 from '@/Pages/EEL01C02A01P01';

interface Props {
  headerInfo: TMainHeaderInfoTypes;
  question: string[];
}

const CONST: Props = {
  headerInfo: { headerText: '학습 목표' },
  question: ['가족을 소개하는 말을 듣고 이해하며 말할 수 있다.', '다른 나라 친구의 문화를 존중하며 의사소통 활동에 참여할 수 있다.'],
};

const P01 = () => {
  return <EEL01C02A01P01 headerInfo={CONST.headerInfo} question={CONST.question}></EEL01C02A01P01>;
};

export default P01;
