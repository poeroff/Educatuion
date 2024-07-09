import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import EEL01C02A01P01 from '@/Pages/EEL01C02A01P01';

interface Props {
  headerInfo: TMainHeaderInfoTypes;
  question: string[];
}

const CONST: Props = {
  headerInfo: { headerText: '학습 목표' },
  question: [
    'i의 소리를 식별하고 소리와 철자의 관계를 이해하며 낱말을 읽을 수 있다.',
    '가족을 나타내는 낱말을 읽고 의미를 이해하며 쓸 수 있다.',
    '가족을 소개하는 문장을 읽고 의미를 이해하며 쓸 수 있다.',
    '어려운 낱말과 문장을 반복하여 읽고 쓸 수 있다.',
  ],
};

const P01 = () => {
  return <EEL01C02A01P01 headerInfo={CONST.headerInfo} question={CONST.question}></EEL01C02A01P01>;
};

export default P01;
