import { IQuestionProps, TMainHeaderInfoTypes, IAudioPlayerProps } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData, getSolutionData } from './pageData';

import EE4L06C01A06b from '@/Pages/EE4L06C01A06b';

interface Props {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  audioInfo: IAudioPlayerProps;
  data: { text: string }[];
  image: { src: string; alt: string };
  label: string[];
}

const CONST: Props = {
  headerInfo: { headerText: 'Mission 1_Quiz 1' },
  questionInfo: { text: '잘 듣고, 그림과 내용이 일치하면 O, 일치하지 않으면 X 를 골라 봅시다.' },
  audioInfo: { audioSrc: '/L06/C01/A06b/EE4-L06-C01-A06b-P03.mp3', captionSrc: '/L06/C01/A06b/EE4-L06-C01-A06b-P03.srt' },
  data: [{ text: 'O' }, { text: 'X' }],
  image: {
    src: '/L06/C01/A06b/EE4-L06-C01-A06b-P03.jpg',
    alt: '초등학교 입학식에서 꽃다발을 들고 있는 여자아이와 그 아이 옆에 서 있는 아빠',
  },
  label: ['답안', '대본', '해석'],
};

const P03 = () => {
  return (
    <EE4L06C01A06b
      headerInfo={CONST.headerInfo}
      questionInfo={CONST.questionInfo}
      audioInfo={CONST.audioInfo}
      image={CONST.image}
      data={CONST.data}
      label={CONST.label}
      mainKey={3}
      subKey={'P01'}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      getSolutionData={getSolutionData}
    />
  );
};
export default P03;
