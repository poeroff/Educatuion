import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData, getSolutionData } from './pageData';
import EEL01C02A02P01 from '@/Pages/EEL01C02A02P01';

interface Props {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  image: { src: string; alt: string };
}

const CONST: Props = {
  headerInfo: { headerText: 'Story 2' },
  questionInfo: { text: '엘라와 앤디는 놀이터에서 무엇을 하고 있나요?' },
  image: {
    src: '/L02/C02/A02/EE4-L02-C02-A02-P01.JPG',
    alt: '총 네 개의 장면으로 이루어진 만화.첫 번째 장면: 여자아이 두 명이 운동장에서 얘기하고 있다. 한 아이가 다른 아이에게 야구공을 건네고 있다.두 번째 장면: 여자아이 두 명과 남자아이 한 명이 이야기를 나누고 있다.세 번째 장면: ‘Camila’라고 쓰여진 글자와 노란색 귀여운 캐릭터가 있다. 세 명의 아이들이 글자를 보고 기뻐하고 있다.네 번째 장면: 교실에서 선생님이 한 여자아이를 반 친구들에게 소개 하고 있고 서로 반갑게 손을 흔들고 있다.',
  },
};

const P01 = () => {
  return (
    <EEL01C02A02P01
      headerInfo={CONST.headerInfo}
      questionInfo={CONST.questionInfo}
      image={CONST.image}
      mainKey={1}
      subKey={'P01'}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      getSolutionData={getSolutionData}
    />
  );
};
export default P01;
