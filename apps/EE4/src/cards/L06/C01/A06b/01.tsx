import { IQuestionProps, TMainHeaderInfoTypes, IAudioPlayerProps } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData, getSolutionData } from './pageData';

import EE4L06C01A06b from '@/Pages//EE4L06C01A06b';

interface Props {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  audioInfo?: IAudioPlayerProps;
  data: { text: string }[];
  image: { src: string; alt: string };
  label: string[];
}

const CONST: Props = {
  headerInfo: { headerText: 'Mission 1_Quiz 1' },
  questionInfo: { text: '1.잘 듣고, 그림과 내용이 일치하면 O, 일치하지 않으면 X 를 골라 봅시다.' },
  audioInfo: { audioSrc: '/L06/C01/A06b/EE4-L06-C01-A06b-P01.mp3', captionSrc: '/L06/C01/A06b/EE4-L06-C01-A06b-P01.srt' },
  data: [{ text: 'O' }, { text: 'X' }],
  image: {
    src: '/L06/C01/A06b/EE4-L06-C01-A06b-P01.jpg',
    alt: '요리하고 있는 여자아이',
  },
  label: ['답안', '대본', '해석'],
};

const P01 = () => {
  return (
    <EE4L06C01A06b
      headerInfo={CONST.headerInfo}
      questionInfo={CONST.questionInfo}
      image={CONST.image}
      data={CONST.data}
      audioInfo={CONST.audioInfo}
      label={CONST.label}
      mainKey={1}
      subKey={'P01'}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      getSolutionData={getSolutionData}
    />
  );
};
export default P01;
