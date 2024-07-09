import { TMainHeaderInfoTypes, IAudioPlayerProps, IQuestionProps } from '@maidt-cntn/ui';
import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';

const headerInfo: TMainHeaderInfoTypes = {
  headerText: 'Listening',
};

const questionInfo: IQuestionProps = {
  text: 'Scripts',
};

const audioInfo: IAudioPlayerProps = {
  audioSrc: '/L03/C12/A03/ME1-L03-C12-A03-P02.mp3',
};

const data: IListenAndAnswer[] = [
  {
    label: 'G',
    labelColor: 'var(--color-yellow-100)',
    originText: 'Dylan. You look upset.',
    translation: 'Dylan. 너 속상해 보여.',
  },
  {
    label: 'B',
    labelColor: 'var(--color-blue-100)',
    originText: 'Yeah, I got a bad grade on my science test.',
    translation: '응, 과학 시험에서 나쁜 성적을 받았어.',
  },
  {
    label: 'G',
    labelColor: 'var(--color-yellow-100)',
    originText: `That's too bad.`,
    translation: '그것 참 안타깝네.',
  },
  {
    label: 'B',
    labelColor: 'var(--color-blue-100)',
    originText: 'Can you study science with me?',
    translation: '나랑 같이 과학 공부할 수 있니?',
  },
  {
    label: 'G',
    labelColor: 'var(--color-yellow-100)',
    originText: 'Sure.',
    translation: '물론이지.',
  },
];
const P02 = () => {
  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} data={data} />;
};

export default P02;
