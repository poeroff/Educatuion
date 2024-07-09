import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import { TMainHeaderInfoTypes, IAudioPlayerProps, IQuestionProps } from '@maidt-cntn/ui';

const P04 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo: IQuestionProps = {
    text: 'Scripts',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C02/A03/HE1-L02-C02-A03-02.mp3',
  };

  const labelB = {
    label: 'B',
    labelColor: 'var(--color-blue-100)',
  };

  const labelG = {
    label: 'G',
    labelColor: 'var(--color-yellow-100)',
  };

  const data: IListenAndAnswer[] = [
    {
      ...labelG,
      originText: 'Hey, Yumin. You seem really focused.',
      translation: '야, 유민아. 너 정말 집중하는 것 같은데.',
    },
    {
      originText: 'What are you working on?',
      translation: '무슨 일 하는 거야?',
      inLine: true,
    },
    {
      ...labelB,
      originText: 'Oh, hi, Brent. I’m trying to understand the poem we learned in class.',
      translation: '안녕, Brent. 나는 우리가 수업시간에 배운 시를 이해하려고 노력하고 있어.',
    },
    {
      originText: 'I’m really interested in poetry.',
      translation: '나는 시에 정말 관심이 많아.',
      inLine: true,
    },
    {
      ...labelG,
      originText: 'Really? That’s cool.',
      translation: '그래? 멋지네.',
    },
    {
      originText: 'Personally, I find poems a bit boring.',
      translation: '나는 개인적으로 시를 좀 지루하게 생각해.',
      inLine: true,
    },
    {
      originText: 'I prefer novels.',
      translation: '나는 소설이 더 좋아.',
      inLine: true,
    },
    {
      ...labelB,
      originText: 'Well, I think poems tell stories and express emotions just like novels do, but they just do so in a different way.',
      translation: '글쎄, 나는 시들이 소설처럼 이야기를 하고 감정을 표현한다고 생각하지만, 그것들은 단지 다른 방식으로 이야기를 해.',
    },
    {
      ...labelG,
      originText: 'But sometimes they’re so unclear and hard to understand.',
      translation: '하지만 너무 불분명하고 이해하기 어려운 경우도 있어.',
    },
    {
      originText: 'We have to read between the lines to figure out the message.',
      translation: '메시지를 파악하려면 행간을 읽어야 해.',
      inLine: true,
    },
    {
      ...labelB,
      originText: 'I know what you mean, but that’s what makes poetry beautiful.',
      translation: '무슨 말인지는 알지만, 그게 바로 시를 아름답게 만드는 거야.',
    },
    {
      originText: 'There’s no right answer, and everyone can interpret a poem differently.',
      translation: '정답은 없고, 누구나 시를 다르게 해석할 수 있어.',
      inLine: true,
    },
    {
      ...labelG,
      originText: 'Hmm, I see. You seem to really love reading poetry.',
      translation: '음, 그렇구나. 너는 시 읽는 것을 정말 좋아하는 것 같네.',
    },
    {
      originText: 'Perhaps I’ll give it a try.',
      translation: '한 번 해볼까 봐.',
      inLine: true,
    },
    {
      ...labelB,
      originText: 'Actually, there’s a poetry reading event at the local bookstore on Saturday. \nWould you like to come with me?',
      translation: '사실 토요일에 동네 서점에서 시낭송 행사가 있는데 같이 갈래?',
    },
    {
      ...labelG,
      originText: 'Sure, why not? It could be a good chance to start appreciating poetry.',
      translation: '물론이지, 왜 안되겠어? 시를 감상할 수 있는 좋은 기회일 수도 있을 거야.',
    },
    {
      ...labelB,
      originText: 'Absolutely!',
      translation: '그럼!',
    },
    {
      originText: 'Let’s meet at the bookstore at 3 p.m. then.',
      translation: '그럼 오후 3시에 서점에서 만나자. ',
      inLine: true,
    },
  ];

  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} data={data} />;
};

export default P04;
