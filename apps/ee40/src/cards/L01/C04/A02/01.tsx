import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData, getSolutionData } from './pageData';
import EEL01C02A02P01 from '@/Pages/EEL01C02A02P01';

interface Props {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  image: { src: string; alt: string };
}

const CONST: Props = {
  headerInfo: { headerText: 'Class Theater' },
  questionInfo: { text: '친구를 도와준 적이 있나요?' },
  image: {
    src: '/L01/C04/A02/EE4-L01-C04-A02-P01.jpg',
    alt: '농구공을 들고 있는 아이가 잔디 위에 넘어진 친구가 일어서는 것을 도와주는 모습',
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
