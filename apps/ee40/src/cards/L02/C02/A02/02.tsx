import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import EEL01C02A02P02 from '@/Pages/EEL01C02A02P02';

interface Props {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  isFile: {
    video: string;
    srt: string;
    haveSrt: boolean;
  };
}

const CONST: Props = {
  headerInfo: { headerText: 'Story 2' },
  questionInfo: { text: '영상을 보며 수아와 윌이 어떤 대화를 나누고 있는지 확인해 봅시다.' },
  isFile: {
    video: '/L02/C02/A02/EE4-L02-C02-A02-P02.mp4',
    srt: '/L02/C02/A02/EE4-L02-C02-A02-P02.srt',
    haveSrt: false,
  },
};

const P02 = () => {
  return <EEL01C02A02P02 headerInfo={CONST.headerInfo} questionInfo={CONST.questionInfo} isFile={CONST.isFile}></EEL01C02A02P02>;
};

export default P02;