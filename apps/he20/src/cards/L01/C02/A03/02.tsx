import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import { TMainHeaderInfoTypes, IAudioPlayerProps } from '@maidt-cntn/ui';

interface IProps {
  headerInfo: TMainHeaderInfoTypes;
  audioInfo: IAudioPlayerProps;
}

const P02 = ({ headerInfo, audioInfo }: IProps) => {
  const questionInfo = {
    text: 'Scripts',
  };

  const data: IListenAndAnswer[] = [
    {
      label: 'B',
      labelColor: 'var(--color-yellow-100)',
      translation: 'Mina, 이번 주말에 특별한 계획이 있어?',
      originText: 'Mina, do you have any special plans for this weekend?',
    },
    {
      label: 'G',
      labelColor: 'var(--color-blue-100)',
      translation: '사실 양로원에서 자원봉사를 할 생각이야.',
      originText: 'I’m thinking of volunteering at a nursing home, actually.',
    },
    {
      label: 'B',
      labelColor: 'var(--color-yellow-100)',
      translation: '좋은 생각 같네.',
      originText: 'Sounds like a great idea.',
    },
    {
      inLine: true,
      translation: '거기서 어떤 일을 할 계획이야?',
      originText: 'What kind of work are you planning to do there?',
    },
    {
      label: 'G',
      labelColor: 'var(--color-blue-100)',
      translation: '음, 어르신들을 위해 요리를 해드리고 싶었는데, 요리 봉사자가 부족해.',
      originText: 'Well, I wanted to cook something for the elderly, but there are enough volunteers for cooking.',
    },
    {
      inLine: true,
      translation: '그래서 대신 노래를 해드리기로 했어.',
      originText: 'So, I’ve decided to sing for them instead.',
    },
    {
      label: 'B',
      labelColor: 'var(--color-yellow-100)',
      translation: '정말 친절하다.',
      originText: 'Oh, that’s so sweet of you.',
    },
    {
      inLine: true,
      translation: '어르신들이 노래를 들으시면 정말 좋아하실 거야.',
      originText: 'I’m sure they’ll love to hear you sing.',
    },
    {
      label: 'G',
      labelColor: 'var(--color-blue-100)',
      translation: '고마워!',
      originText: 'Thanks!',
    },
    {
      inLine: true,
      translation: '그러길 바라야지.',
      originText: 'I hope so.',
    },
    {
      inLine: true,
      translation: '같이 갈래?',
      originText: 'Would you like to come along?',
    },
    {
      label: 'B',
      labelColor: 'var(--color-yellow-100)',
      translation: '물론이지!',
      originText: 'Absolutely!',
    },
    {
      inLine: true,
      translation: '왜 안 되겠어?',
      originText: 'Why not?',
    },
    {
      inLine: true,
      translation: '내가 노래를 잘하진 못하지만 최선을 다할게!',
      originText: 'I’m not a good singer, but I’ll do my best!',
    },
    {
      label: 'G',
      labelColor: 'var(--color-blue-100)',
      translation: '좋아.',
      originText: 'Great.',
    },
    {
      inLine: true,
      translation: '10시에 데리러 올게.',
      originText: 'I’ll pick you up at 10.',
    },
  ];

  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} data={data} />;
};

export default P02;
