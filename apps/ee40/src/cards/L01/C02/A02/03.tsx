import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData, getSolutionData } from './pageData';
import EEL01C02A02P03 from '@/Pages/EEL01C02A02P03';

interface Props {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  video: { src: string; srt: string; haveSrt: boolean; srtErr: string };
  data: { src: string; alt: string }[];
  label: string[];
}

const CONST: Props = {
  headerInfo: { headerText: 'Story 2' },
  questionInfo: { text: '영상을 보며 민지,잭,럭키, 그리고 올리가 무엇을 하고 있는지 확인해 봅시다.' },
  video: {
    src: '/L01/C02/A02/EE4-L01-C02-A02-P03.mp4',
    srt: '/L01/C02/A02/EE4-L01-C02-A02-P03.srt',
    haveSrt: false,
    srtErr: `1
    00:00:00,000 --> 00:00:30,000
    Not srt file..
    `,
  },
  data: [
    { src: '/L01/C02/A02/EE4-L01-C01-A02-P03.jpg', alt: '해가 떠오르고 있는 모습' },
    { src: '/L01/C02/A02/EE4-L01-C01-A02-P05.jpg', alt: '해가 지고 있는 모습' },
  ],
  label: ['답안'],
};

const P01 = () => {
  return (
    <EEL01C02A02P03
      headerInfo={CONST.headerInfo}
      questionInfo={CONST.questionInfo}
      data={CONST.data}
      video={CONST.video}
      label={CONST.label}
      mainKey={3}
      subKey={'P03'}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      getSolutionData={getSolutionData}
    />
  );
};
export default P01;
