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
  questionInfo: { text: '친구들은 공원에서 무엇을 하고 있나요?' },
  image: {
    src: '/L01/C02/A02/EE4-L01-C02-A02-P01.JPG',
    alt: '총 네 개의 장면으로 이루어진 만화로, 첫 번째와 두 번째 장면에는 남자아이 두 명과 여자 아이 한 명이 공원에서 돗자리를 깔고 그 위에서 바나나와 사과를 먹고 있는 모습. 세 번째 장면에는 미끄럼틀을 타고 내려 온 올리가 파란 색 상의를 입은 남자 아이와 인사를 하는 모습. 네 번째 장면에는 올리가 트렘폴린 위에서 뛰고 있는 모습을 세 친구들이 보고 있는 모습',
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