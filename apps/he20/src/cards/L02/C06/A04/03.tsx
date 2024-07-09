import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { contentInfo } from './contentInfo';

const headerInfo: TMainHeaderInfoTypes = {
  headerText: 'Light Up Dark Patterns (2)',
};

const questionInfo: IQuestionProps = {
  text: 'Translations',
  size: 'medium',
};

const audioInfo = {
  audioSrc: '/L02/C06/A04/HE2-L02-C06-A04-P01.mp3',
  captionSrc: '/L02/C06/A04/HE2-L02-C06-A04_P01.srt',
};

const P03 = () => {
  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} data={contentInfo} />;
};

export default P03;
