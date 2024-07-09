// Page: EE4-L11-C04-A02-P04

import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData, getSolutionData } from './pageData';
import EEL01C04A02P03 from '@/Pages/EEL01C04A02P03';

interface Props {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  data: string;
  video: {
    src: string;
    srt: string;
    haveSrt: boolean;
    srtErr: string;
  };
  label: string[];
}

const CONST: Props = {
  headerInfo: { headerText: 'Class Theater' },
  questionInfo: { text: '영상을 보고, 이야기의 내용과 일치하는 것은 O, 일치하지 않는 것은 X 표시를 해 봅시다.' },
  data: '친구는 에드워드에게 12시라고 시각을 알려 줬어요.',
  video: {
    src: '/L11/C04/A02/EE4-L11-C04-A02-P04.mp4',
    srt: '/L11/C04/A02/EE4-L11-C04-A02-P04.srt',
    haveSrt: false,
    srtErr: '',
  },
  label: ['답안'],
};

const P04 = () => {
  return (
    <EEL01C04A02P03
      headerInfo={CONST.headerInfo}
      questionInfo={CONST.questionInfo}
      data={CONST.data}
      video={CONST.video}
      mainKey={3}
      subKey={'P03'}
      label={CONST.label}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      getSolutionData={getSolutionData}
    />
  );
};
export default P04;
