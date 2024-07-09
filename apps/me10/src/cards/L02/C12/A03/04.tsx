import { TMainHeaderInfoTypes, IAudioPlayerProps, IQuestionProps } from '@maidt-cntn/ui';
import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';

const headerInfo: TMainHeaderInfoTypes = {
  headerText: 'Listening',
};

const questionInfo: IQuestionProps = {
  text: 'Scripts',
};

const audioInfo: IAudioPlayerProps = {
  audioSrc: '/L02/C12/A03/ME1-L02-C12-A03-P04.mp3',
};

const data: IListenAndAnswer[] = [
  {
    label: 'G',
    labelColor: 'var(--color-yellow-100)',
    originText: 'Hajin, what are you doing?',
    translation: '하진아, 뭐 하고 있어?',
  },
  {
    label: 'B',
    labelColor: 'var(--color-blue-100)',
    originText: 'I’m doing my math homework.',
    translation: '나는 수학 숙제를 하고 있어.',
  },
  {
    label: 'G',
    labelColor: 'var(--color-yellow-100)',
    originText: 'Do you need help?',
    translation: '너는 도움이 필요하니?',
  },
  {
    label: 'B',
    labelColor: 'var(--color-blue-100)',
    originText: 'No, thanks. I’m okay.',
    translation: '아니, 고마워. 나는 괜찮아.',
  },
];
const P04 = () => {
  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} data={data} />;
};

export default P04;
