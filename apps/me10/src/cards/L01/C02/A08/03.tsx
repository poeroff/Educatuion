import { TMainHeaderInfoTypes, IAudioPlayerProps, IQuestionProps, Typography } from '@maidt-cntn/ui';
import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';

const headerInfo: TMainHeaderInfoTypes = {
  headerPattern: 'icon',
  headerText: 'Listen More',
  iconType: 'listeningStrategy',
};

const questionInfo: IQuestionProps = {
  text: 'Scripts',
};

const data: IListenAndAnswer[] = [
  {
    originText: `Hi, I'm Dylan. Nice to meet you.`,
    translation: '안녕, 나는 Dylan이야. 만나서 반가워.',
    label: 'B',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: `Nice to meet you, too. I'm Yuna from Class 2.\nWhat class are you in?`,
    translation: '나도 만나서 반가워. 나는 2반 유나야.\n너는 몇 반이니?',
    label: 'G',
    labelColor: 'var(--color-yellow-100)',
  },
  {
    originText: `I'm in Class 5. What kind of movies do you like?`,
    translation: '나는 5반이야. 너는 어떤 영화를 좋아하니?',
    label: 'B',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: 'I like action movies. Do you like them, too?',
    translation: '나는 액션 영화를 좋아해. 너도 액션 영화를 좋아하니?',
    label: 'G',
    labelColor: 'var(--color-yellow-100)',
  },
  {
    originText: `No, I don't. I like comedies.`,
    translation: '아니, 그렇지 않아. 나는 코미디를 좋아해',
    label: 'B',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: `What's your favorite movie?`,
    translation: '네가 가장 좋아하는 영화는 뭐니?',
    label: 'G',
    labelColor: 'var(--color-yellow-100)',
  },
  {
    originText: (
      <>
        My favorite movie is{' '}
        <Typography useGap={false} fontStyle='italic'>
          Kung-Fu Panda.
        </Typography>{' '}
        How about you?
      </>
    ),
    translation: `내가 가장 좋아하는 영화는 '쿵푸팬더'야. 너는?`,
    label: 'B',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: (
      <>
        I love{' '}
        <Typography useGap={false} fontStyle='italic'>
          Wonder Woman
        </Typography>
        .
      </>
    ),
    translation: `나는 '원더 우먼'을 매우 좋아해.`,
    label: 'G',
    labelColor: 'var(--color-yellow-100)',
  },
];

const audioInfo: IAudioPlayerProps = {
  audioSrc: '/L01/C02/A08/ME1-L01-C02-A08-P03.mp3',
  captionSrc: '/L01/C02/A08/ME1-L01-C02-A08-P03.srt',
};

const P03 = () => {
  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} data={data} audioInfo={audioInfo} />;
};

export default P03;
