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
  headerInfo: { headerText: 'Listen and Do' },
  questionInfo: { text: '2. 잘 듣고, 그림 속에서 모자의 위치를 골라 봅시다.' },
  audioInfo: { audioSrc: '/L09/C01/A06/EE4-L09-C01-A06-P02.mp3', captionSrc: '/L09/C01/A06/EE4-L09-C01-A06-P02.srt' },
  data: [{ text: 'a.' }, { text: 'b.' }, { text: 'c.' }],
  image: {
    src: '/L09/C01/A06/EE4-L09-C01-A06-P01.png',
    alt: '방에 책상, 의자, 상자가 있고, 책상 위에는 알파벳 a, 의자 아래에는 알파벳 b, 상자 안에는 알파벳 c가 있는 모습',
  },
  label: ['답안'],
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
