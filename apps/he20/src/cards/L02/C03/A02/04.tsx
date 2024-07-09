import { TMainHeaderInfoTypes, IAudioPlayerProps, IQuestionProps } from '@maidt-cntn/ui';
import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';

const headerInfo: TMainHeaderInfoTypes = {
  headerText: 'Listen and Answer',
};

const questionInfo: IQuestionProps = {
  text: 'Scripts',
  size: 'medium',
};

const audioInfo: IAudioPlayerProps = {
  audioSrc: '/L02/C03/A02/HE2-L02-C03-A02-02.mp3',
  captionSrc: '/L02/C03/A02/HE2-L02-C03-A02-02.srt',
};

const data: IListenAndAnswer[] = [
  {
    originText: `Hi, Sumin! What are you doing on your tablet?`,
    translation: `안녕, 수민아! 태블릿으로 뭐 하고 있어?`,
    label: 'B',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: `Hi, Brandon. I’m trying to find a new online fitness class.`,
    translation: `안녕, Brandon. 새로운 온라인 피트니스 수업을 찾아보려고 하고 있어.`,
    label: 'G',
    labelColor: 'var(--color-yellow-100)',
  },
  {
    originText: `I’m not happy with the one I’m taking.`,
    translation: `지금 듣고 있는 수업이 마음에 안 들어.`,
    inLine: true,
  },
  {
    originText: `Whose class is it?`,
    translation: `누구의 수업인데?`,
    label: 'B',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: `Adriana Estefan’s class.`,
    translation: `Adriana Estefan의 수업이요.`,
    label: 'G',
    labelColor: 'var(--color-yellow-100)',
  },
  {
    originText: `Isn’t that one of the most popular online fitness courses?`,
    translation: `그거 가장 인기 있는 온라인 피트니스 강좌 중 하나 아닌가?`,
    label: 'B',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: `What’s wrong with it?`,
    translation: `뭐가 문제인데?`,
    inLine: true,
  },
  {
    originText: `Despite her reputation, I realized that her course is a bit too challenging for me.`,
    translation: `그녀의 명성에도 불구하고 그녀의 수업이 나한테 너무 어렵다고 생각해.`,
    label: 'G',
    labelColor: 'var(--color-yellow-100)',
  },
  {
    originText: `It’s hard to follow all the moves.`,
    translation: `모든 동작을 따라하기 힘들어.`,
    inLine: true,
  },
  {
    originText: `You should probably watch the class introduction video and check the reviews before signing up for a course next time.`,
    translation: `다음에는 강좌를 신청하기 전에 수업 소개 동영상을 보고 후기를 확인하는 것이 좋을 것 같아.`,
    label: 'B',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: `The first class is usually a free trial, so you can watch that, too.`,
    translation: `첫 수업은 보통 무료 체험판으로 제공되니 그것도 시청해 봐.`,
    inLine: true,
  },
  {
    originText: `That’s a good idea. I’ll do that.`,
    translation: `좋은 생각이네. 그렇게 해볼게.`,
    label: 'G',
    labelColor: 'var(--color-yellow-100)',
  },
  {
    originText: `I hope I can find the right course for me.`,
    translation: `나한테 맞는 강좌를 찾을 수 있으면 좋겠어.`,
    inLine: true,
  },
  {
    originText: `Good luck!`,
    translation: `행운을 빌어!`,
    label: 'B',
    labelColor: 'var(--color-blue-100)',
  },
];

const P04 = () => {
  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} data={data} />;
};

export default P04;
