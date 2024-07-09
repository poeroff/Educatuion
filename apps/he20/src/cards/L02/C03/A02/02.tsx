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
  audioSrc: '/L02/C03/A02/HE2-L02-C03-A02-01.mp3',
  captionSrc: '/L02/C03/A02/HE2-L02-C03-A02-01.srt',
};

const data: IListenAndAnswer[] = [
  {
    originText: `Dad, can I have my allowance early this week?`,
    translation: `아빠, 저 이번 주에 용돈을 일찍 받을 수 있을까요?`,
    label: 'G',
    labelColor: 'var(--color-yellow-100)',
  },
  {
    originText: `What? Didn’t you get your allowance from your mom a couple of days ago?`,
    translation: `뭐? 며칠 전에 엄마한테 용돈 받지 않았니?`,
    label: 'M',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: `Yes, I did, but I ended up buying this really cool T-shirt because it was half price.`,
    translation: `네, 그랬는데 반값이라서 정말 멋진 티셔츠를 샀거든요.`,
    label: 'G',
    labelColor: 'var(--color-yellow-100)',
  },
  {
    originText: `I’m really satisfied with the deal.`,
    translation: `저는 그 구매가 정말 만족스러워요.`,
    inLine: true,
  },
  {
    originText: `I don’t think it’s very wise to buy things just because they’re on sale.`,
    translation: `난 세일한다고 해서 무조건 사는 건 현명하지 않다고 생각하는데.`,
    label: 'M',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: `I know, Dad, but I just love the design.`,
    translation: `알아요, 아빠, 하지만 디자인이 너무 마음에 들어요.`,
    label: 'G',
    labelColor: 'var(--color-yellow-100)',
  },
  {
    originText: `I know you do, but you shouldn’t shop so carelessly.`,
    translation: `나도 네가 그랬을 거라고 생각하지만 그렇게 무분별하게 쇼핑하면 안 돼.`,
    label: 'M',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: `You need to make a spending plan to manage your money more effectively.`,
    translation: `돈을 더 효과적으로 관리하려면 지출 계획을 세워야 해.`,
    inLine: true,
  },
  {
    originText: `Okay, Dad. I’ll try.`,
    translation: `알았어요, 아빠. 노력해 볼게요.`,
    label: 'G',
    labelColor: 'var(--color-yellow-100)',
  },
  {
    originText: `Thanks, I believe you’ll make reasonable choices.`,
    translation: `고맙다, 난 네가 합리적인 선택을 할 거라고 믿어.`,
    label: 'M',
    labelColor: 'var(--color-blue-100)',
  },
];

const P02 = () => {
  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} data={data} />;
};

export default P02;
