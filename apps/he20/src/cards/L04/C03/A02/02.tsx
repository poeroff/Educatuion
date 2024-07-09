import { TMainHeaderInfoTypes, IAudioPlayerProps, IQuestionProps } from '@maidt-cntn/ui';
import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';

const headerInfo: TMainHeaderInfoTypes = {
  headerText: 'Listen and Answer',
};

const questionInfo: IQuestionProps = {
  text: 'Scripts',
};

const data: IListenAndAnswer[] = [
  {
    originText: 'Hey, Jacob!',
    translation: '안녕, Jacob!',
    label: 'G',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: 'Have you finished reading the article “Medical Technology of the Future” for our biology class?',
    translation: '우리 생물 수업의 "미래의 의료 기술" 기사를 다 읽었니?',
    inLine: true,
  },
  {
    originText: 'I have.',
    translation: '그럼.',
    label: 'B',
    labelColor: 'var(--color-yellow-100)',
  },
  {
    originText: 'It was fun to read.',
    translation: '그거 재밌게 읽었어.',
    inLine: true,
  },
  {
    originText: 'Some experts say that people will be able to live up to 150 years in the near future thanks to nanobots.',
    translation: '일부 전문가들은 나노봇 덕분에 가까운 미래에 사람들이 150년까지 살 수 있을 거라고 말해요.',
    inLine: true,
  },
  {
    originText: 'Oh, really?',
    translation: '아, 정말?',
    label: 'G',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: 'That sounds interesting.',
    translation: '흥미롭게 들리네.',
    inLine: true,
  },
  {
    originText: 'How will nanobots make it possible?',
    translation: '나노봇이 어떻게 그런 일을 가능하게 할까?',
    inLine: true,
  },
  {
    originText: 'They’ll be injected into our bodies to treat diseases.',
    translation: '나노봇은 질병 치료를 위해 우리 몸에 주입될 거야. ',
    label: 'B',
    labelColor: 'var(--color-yellow-100)',
  },
  {
    originText: 'Nanobots will be able to target and destroy cancer cells in the body, for example.',
    translation: '예를 들어 나노봇은 체내 암세포를 표적으로 삼아 파괴할 수 있게 될 거야.',
    inLine: true,
  },
  {
    originText: 'That’s amazing!',
    translation: '놀랍다!',
    label: 'G',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: 'We may all be healthier and live a lot longer in the future then.',
    translation: '그러면 우리 모두 더 건강해지고 더 오래 살 수 있겠네.',
    inLine: true,
  },
  {
    originText: 'That’s right.',
    translation: '맞아.',
    label: 'B',
    labelColor: 'var(--color-yellow-100)',
  },
  {
    originText: 'But we still have a long way to go.',
    translation: '하지만 아직 갈 길이 멀지.',
    inLine: true,
  },
  {
    originText: 'I believe there will be many more challenges to overcome.',
    translation: '극복해야 할 과제가 더 많을 거라고 생각해.',
    inLine: true,
  },
  {
    originText: 'I agree with you.',
    translation: '나도 동의해.',
    label: 'G',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: 'Well, let’s discuss it more in our next biology class.',
    translation: '음, 우리 다음 생물학 수업 시간에 더 자세히 논의해 보자.',
    inLine: true,
  },
];

const audioInfo: IAudioPlayerProps = {
  audioSrc: '/L04/C03/A02/HE2-L04-C03-A02-01.mp3',
  captionSrc: '/L04/C03/A02/HE2-L04-C03-A02-01.srt',
};

const P02 = () => {
  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} data={data} audioInfo={audioInfo} />;
};

export default P02;
