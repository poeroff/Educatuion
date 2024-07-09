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
  headerInfo: { headerText: 'Sounds and Letters 1' },
  questionInfo: { text: 'e의 소리에 집중하여 큰 소리로 찬트를 따라 불러 봅시다.' },
  isFile: {
    video: '/L04/C03/A02/EE4-L04-C03-A02-P02.mp4',
    srt: '/L04/C03/A02/EE4-L04-C03-A02-P02.srt',
    haveSrt: false,
  },
};

const P02 = () => {
  return <EEL01C02A02P02 headerInfo={CONST.headerInfo} questionInfo={CONST.questionInfo} isFile={CONST.isFile}></EEL01C02A02P02>;
};

export default P02;
