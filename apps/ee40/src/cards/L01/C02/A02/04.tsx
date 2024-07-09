import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData, getSolutionData } from './pageData';
import EEL01C01A02P04 from '@/Pages/EEL01C01A02P04';

interface Props {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  video: { src: string; srt: string };
  data: { left: string; right: string; mainKey: number; subKey: string; image: { src: string; alt: string } }[];
}

const CONST: Props = {
  headerInfo: { headerText: 'Story 2' },
  questionInfo: { text: '영상을 보고, 잭과 럭키가 좋아하는 것을 찾아 연결해 봅시다.' },
  video: {
    src: '/L01/C02/A02/EE4-L01-C02-A02-P04.mp4',
    srt: `
1
00:00:00,000 --> 00:00:30,000
No srt file...
`,
  },
  data: [
    { left: '잭', right: '바나나', mainKey: 1, subKey: 'LINE-1', image: { src: '/L01/C02/A02/EE4-L01-C02-A02-P04-01.jpg', alt: '잭의 모습' } },
    { left: '럭키', right: '사과', mainKey: 2, subKey: 'LINE-1', image: { src: '/L01/C02/A02/EE4-L01-C02-A02-P04-02.jpg', alt: '럭키의 모습' } },
  ],
};

const P01 = () => {
  return (
    <EEL01C01A02P04
      headerInfo={CONST.headerInfo}
      questionInfo={CONST.questionInfo}
      mainKey={4}
      data={CONST.data}
      video={CONST.video}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      getSolutionData={getSolutionData}
    />
  );
};
export default P01;
