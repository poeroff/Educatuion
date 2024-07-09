import { IQuestionProps, TMainHeaderInfoTypes, IAudioPlayerProps } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData, getSolutionData } from './pageData';
import EEL01C01A08P01 from '@/Pages/EEL01C01A08P01';

interface Props {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  audioInfo: IAudioPlayerProps;
  data: { text: string }[];
  image: { src: string; alt: string };
  label: string[];
}

const CONST: Props = {
  headerInfo: { headerText: 'Mission 1_Quiz 2' },
  questionInfo: { text: '잘 듣고, 그림에 알맞은 응답을 골라 봅시다.' },
  audioInfo: { audioSrc: '/L08/C01/A05/EE4-L08-C01-A05-P05.mp3' },
  data: [{ text: '400원' }, { text: '500원' }, { text: '600원' }],
  image: {
    src: '/L08/C01/A05/EE4-L08-C01-A05-P01.png',
    alt: '친구들이 알뜰 시장에서 가방, 장화, 컵, 신발, 자동차, 로봇, 모자, 우산, 시계, 배드민턴 라켓 등을 사고 팔고 있는 모습',
  },
  label: ['답안'],
};

const P05 = () => {
  return (
    <EEL01C01A08P01
      headerInfo={CONST.headerInfo}
      questionInfo={CONST.questionInfo}
      audioInfo={CONST.audioInfo}
      image={CONST.image}
      data={CONST.data}
      label={CONST.label}
      mainKey={5}
      subKey={'P05'}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      getSolutionData={getSolutionData}
    />
  );
};
export default P05;
