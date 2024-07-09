import { TMainHeaderInfoTypes, IAudioPlayerProps, IQuestionProps } from '@maidt-cntn/ui';
import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';

const headerInfo: TMainHeaderInfoTypes = {
  headerText: 'Listen and Answer',
};

const questionInfo: IQuestionProps = {
  text: 'Scripts',
};

const audioInfo: IAudioPlayerProps = {
  audioSrc: '/L04/C03/A02/HE1-L04-C03-A02-01.mp3',
  captionSrc: '/L04/C03/A02/HE1-L04-C03-A02-01.srt',
};

const data: IListenAndAnswer[] = [
  {
    originText: 'Hey, Dad. What are you doing? ',
    translation: '아, 아빠. 뭐 하고 계세요? ',
    label: 'G',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: 'Are you sewing up holes in your socks?',
    translation: '양말 구멍 꿰매고 계셨어요?',
    inLine: true,
  },
  {
    originText: 'Good morning, Amy.',
    translation: '좋은 아침이야, Amy.',
    label: 'M',
    labelColor: 'var(--color-yellow-100)',
  },
  {
    originText: 'I’m actually making some dolls for your little sister.',
    translation: '네 여동생을 위해 인형을 만들고 있단다.',
    inLine: true,
  },
  {
    originText: 'It’s a great way to recycle socks that have holes in them or are out of style.',
    translation: '구멍이 나거나 유행이 지난 양말을 재활용할 수 있는 좋은 방법이야.',
    inLine: true,
  },
  {
    originText: 'That’s so cool. ',
    translation: '정말 멋지네요. ',
    label: 'G',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: 'You’re giving new life to things that would have been thrown away.',
    translation: '버려질 수 있는 물건에 새 생명을 불어넣는 거잖아요.',
    inLine: true,
  },
  {
    originText: 'Yes.',
    translation: '그럼. ',
    label: 'M',
    labelColor: 'var(--color-yellow-100)',
  },
  {
    originText: 'Why don’t you make one with me?',
    translation: '나랑 같이 하나 만들어 볼래?',
    inLine: true,
  },
  {
    originText: 'Really? I’d love to!',
    translation: '정말요? 그러고 싶어요! ',
    label: 'G',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: ' What do I need?',
    translation: '뭐가 필요해요?',
    inLine: true,
  },
  {
    originText: 'Just bring some of your old socks.​',
    translation: '낡은 양말만 가져오면 돼.​',
    label: 'M',
    labelColor: 'var(--color-yellow-100)',
  },
  {
    originText: 'I already have everything else.​',
    translation: '다른 건 이미 다 있어.​',
    inLine: true,
  },
  {
    originText: 'All right. ',
    translation: '알았어요. ',
    label: 'G',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: 'I’ll get them now.',
    translation: '지금 가져올게요.',
    inLine: true,
  },
  {
    originText: 'I can’t wait to see the smile on my little sister’s face!',
    translation: '제 동생의 미소를 빨리 보고 싶어요!',
    inLine: true,
  },
];

const P02 = () => {
  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} data={data} />;
};

export default P02;
