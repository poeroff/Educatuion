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
  headerInfo: { headerText: 'Review 1' },
  questionInfo: { text: '1. 잘 듣고, 그림에 알맞은 응답을 골라 봅시다.' },
  audioInfo: { audioSrc: '/L05/C04/A04/EE4-L05-C04-A04-P01.mp3', captionSrc: '/L05/C04/A04/EE4-L05-C04-A04-P01.srt'},
  data: [{ text: 'O' }, { text: 'X' }],
  image: {
    src: '/L05/C04/A04/EE4-L05-C04-A04-P01.JPG',
    alt: '농구장에서 남자아이가 농구공을 들고 무언가를 물어보고 있고 엄지 손가락을 올리고 웃는 여자아이 위에 o가 나타나 있는 그림',
  },
  label: ['답안', '대본', '해석'],
};

const P01 = () => {
  return (
    <EEL01C01A08P01
      headerInfo={CONST.headerInfo}
      questionInfo={CONST.questionInfo}
      audioInfo={CONST.audioInfo}
      image={CONST.image}
      data={CONST.data}
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