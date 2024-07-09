import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';

const headerInfo: TMainHeaderInfoTypes = {
  headerText: 'Will AI-Powered Neural Implants Make Us Super-Humans? (2)',
};

const questionInfo: IQuestionProps = {
  text: 'Translations',
  size: 'medium',
};

const data: IListenAndAnswer[] = [
  {
    originText: ' First, let’s explore how this fascinating technology has been applied.',
    translation: '먼저 이 매혹적인 기술이 어떻게 적용되었는지 살펴봅시다.',
  },
  {
    originText: 'The AI-powered neural implant has shown great promise in medical applications, offering solutions to a range of problems.',
    translation: 'AI 기반 신경 임플란트는 다양한 문제에 대한 해결책을 제시하며 의료 분야에서 큰 가능성을 보여주었습니다.',
  },
  {
    originText: 'For instance, neural implants are used to treat brain disorders like Parkinson’s disease.',
    translation: '예를 들어, 신경 임플란트는 파킨슨병과 같은 뇌 질환을 치료하는 데 사용됩니다.',
  },
  {
    originText:
      'These implants electrically stimulate targeted regions of the brain at the right time with the help of AI to restore normal brain activity.',
    translation: '이러한 임플란트는 AI의 도움을 받아 적시에 뇌의 표적 부위를 전기적으로 자극하여 정상적인 뇌 활동을 회복시킵니다.',
  },
  {
    originText:
      'In addition, paralyzed people can have the ability to walk again with the help of a “digital bridge” between two implants inserted into their brain and spine.',
    translation: "또한 마비 환자들은 뇌와 척추에 삽입된 두 개의 임플란트 사이의 '디지털 브릿지'를 통해 다시 걸을 수 있게 됩니다.​",
  },
  {
    originText: 'When they think about moving their legs, the AI analyzes the brain signals and sends them to their legs through the implants.',
    translation: '환자가 다리를 움직이려고 생각하면 AI가 뇌 신호를 분석하여 임플란트를 통해 다리로 신호를 보냅니다.',
  },
  {
    originText: 'Similarly, those who have lost their arms can use artificial arms operated by the same mechanism.',
    translation: '마찬가지로 팔을 잃은 사람들도 동일한 메커니즘으로 작동하는 의수를 사용할 수 있습니다.',
  },
];

const P03 = () => {
  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} data={data} />;
};

export default P03;
