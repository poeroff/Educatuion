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
  headerInfo: { headerText: 'Mission 2_Quiz 2' },
  questionInfo: { text: '잘 듣고, 그림에 알맞은 응답을 골라 봅시다.' },
  audioInfo: { audioSrc: '/L05/C04/A04/EE4-L05-C04-A04-P01.mp3', captionSrc: '/L05/C04/A04/EE4-L05-C04-A04-P01.srt'},
  data: [{ text: 'a' }, { text: 'b' }, { text: 'c' }],
  image: {
    src: '/L05/C04/A04/EE4-L05-C04-A04-P02.JPG',
    alt: '아진이라는 이름표를 달고 자신을 가리키고 있는 여자아이와 그 남자아이를 가리키고 있는 남자아이',
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
