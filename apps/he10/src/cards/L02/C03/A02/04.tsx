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
  audioSrc: '/L02/C03/A02/HE1-L02-C03-A02-02.mp3',
  captionSrc: '/L02/C03/A02/HE1-L02-C03-A02-02.srt',
};

const data: IListenAndAnswer[] = [
  {
    originText: 'Hello, students.',
    translation: '안녕하세요, 학생 여러분.',
    label: 'W',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: 'I’m Professor Clara Smith, a cultural anthropologist.',
    translation: '저는 문화인류학자인 Clara Smith 교수입니다.',
    inLine: true,
  },
  {
    originText: 'We often hear the phrase “It’s a small world,” but is it really?',
    translation: '‘세상은 좁다’라는 말을 자주 듣지만 정말 그럴까요?',
    inLine: true,
  },
  {
    originText: 'Every culture has its own unique traditions and customs, from gestures to table manners.',
    translation: '모든 문화에는 제스처부터 테이블 매너까지 고유한 전통과 관습이 있습니다.',
    inLine: true,
  },
  {
    originText: 'Something that looks common to you might seem strange or unusual to others.',
    translation: '나에게는 평범해 보이는 것이 다른 사람에게는 이상하거나 특이한 것으로 보일 수도 있습니다.',
    inLine: true,
  },
  {
    originText: 'Let me give you some examples.',
    translation: '몇 가지 예를 들어보겠습니다.',
    inLine: true,
  },
  {
    originText: 'In most Western countries, it’s okay to open gifts right away, but in China, it’s considered rude.',
    translation: '대부분의 서구 국가에서는 선물을 바로 개봉해도 괜찮지만 중국에서는 무례한 행동으로 간주됩니다.',
    inLine: true,
  },
  {
    originText:
      'Similarly, touching a person’s head, including that of a child, is impolite in Thailand and Laos, whereas it may be no big deal in other countries. ',
    translation:
      '마찬가지로 태국과 라오스에서는 어린아이를 포함한 사람의 머리를 만지는 것이 무례하지만 다른 나라에서는 큰 문제가 되지 않을 수 있습니다. ',
    inLine: true,
  },
  {
    originText: 'So it’s important to understand different cultures when visiting other countries.',
    translation: '따라서 다른 나라를 방문할 때는 다른 문화를 이해하는 것이 중요합니다.',
    inLine: true,
  },
  {
    originText: 'As a responsible global citizen, make sure to acknowledge that each culture has its own values that we should respect.',
    translation: '책임감 있는 글로벌 시민으로서 각 문화에는 존중해야 할 고유한 가치가 있음을 인정하세요.',
    inLine: true,
  },
];

const P04 = () => {
  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} data={data} />;
};

export default P04;
