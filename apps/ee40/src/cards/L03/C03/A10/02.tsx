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
  headerInfo: { headerText: 'Mission 3_Quiz 2' },
  questionInfo: { text: '그림을 보고, 알맞은 문장을 골라 봅시다' },
  // audioInfo: { audioSrc: '/L03/C03/A10/EE4-L03-C03-A10-P02.mp3', captionSrc: '/L03/C03/A10/EE4-L03-C03-A10-P02.srt' },
  data: [{ text: 'She’s my teacher.' }, { text: 'She’s my grandma.' }, { text: 'She’s my friend.' }],
  image: {
    src: '/L03/C03/A10/EE4-L03-C03-A10-P02.JPG',
    alt: '할아버지와 할머니가 찍힌 사진을 보며 할머니를 소개하는 아이들',
  },
  label: ['답안', '해설'],
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
