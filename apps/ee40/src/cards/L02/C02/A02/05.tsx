import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData, getSolutionData } from './pageData';
import EEL01C01A08P01 from '@/Pages/EEL01C01A08P01';

interface Props {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  data: { text: string }[];
  image: { src: string; alt: string };
  label: string[];
}

const CONST: Props = {
  headerInfo: { headerText: 'Story 2' },
  questionInfo: { text: '올리를 처음 만난 친구는 누구였나요?' },
  data: [{ text: '카밀라' }, { text: '선생님' }, { text: '앤디' }],
  image: {
    src: '/L02/C02/A02/L02-C02-A02-P05.png',
    alt: '총 네 개의 장면으로 이루어진 만화. 첫 번째 장면: 여자아이 두 명이 운동장에서 얘기하고 있다. 한 아이가 다른 아이에게 야구공을 건네고 있다. 두 번째 장면: 여자아이 두 명과 남자아이 한 명이 이야기를 나누고 있다. 세 번째 장면: ‘Camila’라고 쓰여진 글자와 노란색 귀여운 캐릭터가 있다. 세 명의 아이들이 글자를 보고 기뻐하고 있다. 네 번째 장면: 교실에서 선생님이 한 여자아이를 반 친구들에게 소개 하고 있고 서로 반갑게 손을 흔들고 있다.',
  },
  label: ['답안'],
};

const P05 = () => {
  return (
    <EEL01C01A08P01
      headerInfo={CONST.headerInfo}
      questionInfo={CONST.questionInfo}
      image={CONST.image}
      data={CONST.data}
      mainKey={3}
      subKey={'NUMBER-01'}
      label={CONST.label}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      getSolutionData={getSolutionData}
    />
  );
};
export default P05;
