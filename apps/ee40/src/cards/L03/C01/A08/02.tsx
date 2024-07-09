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
  questionInfo: { text: '잘 듣고, 그림에 알맞은 대화를 골라 봅시다.' },
  audioInfo: { audioSrc: '/L03/C01/A08/EE4-L03-C01-A08-P02.mp3', captionSrc: '/L03/C01/A08/EE4-L03-C01-A08-P02.srt' },
  data: [{ text: 'a' }, { text: 'b' }],
  image: {
    src: '/L03/C01/A08/EE4-L03-C01-A08-P02.png',
    alt: '화면 속 할머니를 보며 대화를 나누고 있는 여자아이와 남자아이',
  },
  label: ['답안', '대본', '해석'],
};

const P02 = () => {
  return (
    <EEL01C01A08P01
      headerInfo={CONST.headerInfo}
      questionInfo={CONST.questionInfo}
      audioInfo={CONST.audioInfo}
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
