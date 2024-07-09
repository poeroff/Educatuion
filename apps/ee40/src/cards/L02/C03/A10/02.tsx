import { IQuestionProps, TMainHeaderInfoTypes, IAudioPlayerProps } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData, getSolutionData } from './pageData';
import EEL01C01A08P01 from '@/Pages/EEL01C01A08P01';

interface Props {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  // audioInfo: IAudioPlayerProps;
  data: { text: string }[];
  image: { src: string; alt: string };
  label: string[];
}

const CONST: Props = {
  headerInfo: { headerText: 'Mission 3_Quiz 2' },
  questionInfo: { text: '그림을 보고, 알맞은 낱말을 골라 봅시다.' },
  // audioInfo: { audioSrc: '/L01/C01/A08/EE4-L01-C01-A08-P02.mp3' },
  data: [{ text: 'dad' }, { text: 'sister' }, { text: 'brother' }],
  image: {
    src: '/L02/C03/A10/EE4-L02-C03-A10-P02.JPG',
    alt: ' 어린 남자아이의 손을 잡고 있는 남자아이',
  },
  label: ['답안', '해설'],
};

const P02 = () => {
  return (
    <EEL01C01A08P01
      headerInfo={CONST.headerInfo}
      questionInfo={CONST.questionInfo}
      // audioInfo={CONST.audioInfo}
      image={CONST.image}
      data={CONST.data}
      label={CONST.label}
      mainKey={2}
      subKey={'P02'}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      getSolutionData={getSolutionData}
    />
  );
};
export default P02;
