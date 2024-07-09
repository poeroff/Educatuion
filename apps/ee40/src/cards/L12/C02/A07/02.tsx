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
  audioInfo: { audioSrc: '/L12/C02/A07/EE4-L12-C02-A07-P02.mp3' },
  data: [{ text: 'a.' }, { text: 'b.' }, { text: 'c.' }],
  image: {
    src: '/L12/C02/A07/EE4-L12-C02-A07-P02.png',
    alt: '책을 읽는 모습이 있는 말풍선 옆 여자아이와 자전거가 있는 말풍선 옆 남자아이가 벤치에 앉아 있는 모습',
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
