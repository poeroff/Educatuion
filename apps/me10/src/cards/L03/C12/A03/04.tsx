import { TMainHeaderInfoTypes, IAudioPlayerProps, IQuestionProps } from '@maidt-cntn/ui';
import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';

const headerInfo: TMainHeaderInfoTypes = {
  headerText: 'Listening',
};

const questionInfo: IQuestionProps = {
  text: 'Scripts',
};

const audioInfo: IAudioPlayerProps = {
  audioSrc: '/L03/C12/A03/ME1-L03-C12-A03-P04.mp3',
};

const data: IListenAndAnswer[] = [
  {
    label: 'G',
    labelColor: 'var(--color-yellow-100)',
    originText: `Hajin, what's wrong?`,
    translation: '하진아, 무슨 일이니?',
  },
  {
    label: 'B',
    labelColor: 'var(--color-blue-100)',
    originText: `Nothing. I'm just tired.`,
    translation: '아무것도 아니야. 그저 피곤할 뿐이야.',
  },
  {
    label: 'G',
    labelColor: 'var(--color-yellow-100)',
    originText: 'Did you go to bad late last night?',
    translation: '어젯밤에 늦게 잤니?',
  },
  {
    label: 'B',
    labelColor: 'var(--color-blue-100)',
    originText: `No, I didn't. But I had a bad dream.`,
    translation: '아니, 그러지 않았어. 근데 나쁜 꿈을 꿨어.',
  },
  {
    label: 'G',
    labelColor: 'var(--color-yellow-100)',
    originText: 'Aww. Get some rest during the break.',
    translation: '아, 휴식 시간에 좀 쉬어.',
  },
];

const P04 = () => {
  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} data={data} />;
};

export default P04;
