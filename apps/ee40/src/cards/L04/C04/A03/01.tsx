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
  headerInfo: { headerText: 'Act Out' },
  questionInfo: { text: '‘청개구리‘ 영상을 다시 한번 봅시다.' },
  isFile: {
    video: '/L04/C04/A03/EE4-L04-C04-A03-P01.mp4',
    srt: '/L04/C04/A03/EE4-L04-C04-A03-P01.srt',
    haveSrt: false,
  },
};

const P01 = () => {
  return <EEL01C02A02P02 headerInfo={CONST.headerInfo} questionInfo={CONST.questionInfo} isFile={CONST.isFile}></EEL01C02A02P02>;
};

export default P01;