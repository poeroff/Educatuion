import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import EEL01C02A01P01 from '@/Pages/EEL01C02A01P01';

interface Props {
  headerInfo: TMainHeaderInfoTypes;
  question: string[];
}

const CONST: Props = {
  headerInfo: { headerText: '학습 목표' },
  question: [
    '안부를 묻고 답하는 말을 듣고 이해하며 말할 수 있다.',
    '때에 알맞은 인사말을 듣고 이해하며 말할 수 있다.',
    '예의 바른 태도와 목소리로 인사할 수 있다.',
  ],
};

const P01 = () => {
  return <EEL01C02A01P01 headerInfo={CONST.headerInfo} question={CONST.question}></EEL01C02A01P01>;
};

export default P01;
