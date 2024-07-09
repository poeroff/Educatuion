import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import EEL01C02A01P01 from '@/Pages/EEL01C02A01P01';

interface Props {
  headerInfo: TMainHeaderInfoTypes;
  question: string[];
}

const CONST: Props = {
  headerInfo: { headerText: '학습 목표' },
  question: [
    '한 학년 동안 배운 내용을 활용하여 학생들이 자기 주도적으로 선택한 활동을 수행할 수 있다.',
    '모둠원들과 협력하여 활동 산출물을 완성하거나 자신 있게 발표할 수 있다.',
  ],
};

const P01 = () => {
  return <EEL01C02A01P01 headerInfo={CONST.headerInfo} question={CONST.question}></EEL01C02A01P01>;
};

export default P01;
