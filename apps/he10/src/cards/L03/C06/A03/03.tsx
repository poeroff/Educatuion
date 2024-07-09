import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Tuning Out: The Science of Noise-Cancellation (1)',
    headerPattern: 'text',
  };

  const questionInfo = {
    text: 'Translations',
  };

  const data: IListenAndAnswer[] = [
    {
      originText: 'Which is the better environment for studying: a noisy place or a quiet place?',
      translation: '공부하기에 더 좋은 환경은 시끄러운 곳인가요, 아니면 조용한 곳인가요?',
    },
    {
      originText: 'Rarely do people want to put up with a lot of noise because it can be unpleasant and distracting.',
      translation: '많은 소음은 불쾌하고 주의를 산만하게 하기 때문에 사람들이 소음을 참고 싶어하는 경우는 거의 없습니다.',
    },
    {
      originText:
        'Fortunately, scientists have invented noise-cancelling technology, which is now being used across various fields to reduce unwanted noise.',
      translation: '다행스럽게도 과학자들은 노이즈 캔슬링 기술을 발명했으며 현재는 원치 않는 소음을 줄이기 위해 다양한 분야에서 사용되고 있습니다.',
    },
    {
      originText: 'What is the scientific principle behind this achievement?',
      translation: '이 성과 뒤에 숨은 과학적 원리는 무엇일까요?',
    },
    {
      originText: `To understand this, let's examine how sound travels.`,
      translation: '이를 이해하기 위해 소리가 어떻게 이동하는지 살펴보겠습니다.',
    },
  ];

  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} data={data} />;
};

export default P03;
