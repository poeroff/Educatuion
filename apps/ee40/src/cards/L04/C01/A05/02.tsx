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
  questionInfo: { text: '영상을 보며, 수업 시간에 금지 행동을 한 친구들이 누구인지 확인해 봅시다.' },
  isFile: {
    video: '/L04/C02/A05/EE4-L04-C01-A05-P02.mp4',
    srt: '/L04/C02/A05/EE4-L04-C01-A05-P02.srt',
    haveSrt: false,
  },
};

const P02 = () => {
  return <EEL01C02A02P02 headerInfo={CONST.headerInfo} questionInfo={CONST.questionInfo} isFile={CONST.isFile}></EEL01C02A02P02>;
};

export default P02;
