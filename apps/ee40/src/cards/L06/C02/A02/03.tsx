// Page: EE4-L06-C02-A02-P03

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
  questionInfo: { text: '영상을 보고 수호가 카밀라와 잭에가 무엇을 하자고 제안 했는지 골라 봅시다.' },
  video: {
    src: '/L06/C02/A02/EE4-L06-C02-A02-P03.mp4',
    srt: '/L06/C02/A02/EE4-L06-C02-A02-P03.srt',
    haveSrt: false,
    srtErr: `1
    00:00:00,000 --> 00:00:30,000
    Not srt file..
    `,
  },
  data: [
    { src: '/L06/C02/A02/EE4-L06-C02-A02-P03-01.jpg', alt: '여자 아이가 그림을 그리고 있다.' },
    { src: '/L06/C02/A02/EE4-L06-C02-A02-P03-02.jpg', alt: '남자 아이가 책을 읽고 있다.' },
  ],
  label: ['답안'],
};

const P03 = () => {
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
export default P03;
