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
  data: '왕자가 신데렐라에게 함께 춤을 추자고 했어요.',
  video: {
    src: '/L10/C04/A02/EE4-L10-C04-A02-P03.mp4',
    srt: '/L10/C04/A02/EE4-L10-C04-A02-P03.srt',
    haveSrt: false,
    srtErr: '',
  },
  label: ['답안'],
};

const P03 = () => {
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
export default P03;
