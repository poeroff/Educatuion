import { TMainHeaderInfoTypes, IAudioPlayerProps, IQuestionProps } from '@maidt-cntn/ui';
import { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import HE00501 from '@maidt-cntn/pages/HE-005-01';

const P04 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo: IQuestionProps = {
    text: 'Scripts',
    size: 'medium',
  };

  const data: IListenAndAnswer[] = [
    {
      originText: 'Hello, everyone! I’m Kelly.',
      translation: '안녕하세요, 여러분! 저는 Kelly입니다.',
      label: 'G',
      labelColor: 'var(--color-grey-100)',
    },
    {
      originText: 'Are you thinking of adopting a hamster?',
      translation: '햄스터 입양을 고려하고 계신가요?',
      inLine: true,
    },
    {
      originText: 'Today, I’d like to share what I’ve learned from raising my hamster.',
      translation: '오늘은 제가 햄스터를 키우면서 배운 것들을 공유하고자 합니다.',
      inLine: true,
    },
    {
      originText: 'First of all, it’s important to understand that hamsters are quite sensitive.',
      translation: '우선, 햄스터는 매우 예민하다는 것을 이해하는 것이 중요합니다.',
      inLine: true,
    },
    {
      originText: 'While many people think that taking care of hamsters is easy, they actually require a lot of special attention.',
      translation: '많은 사람들이 햄스터를 돌보는 것이 쉽다고 생각하지만, 실제로는 많은 특별한 주의가 필요합니다.',
      inLine: true,
    },
    {
      originText:
        'For example, hamsters are active at night and sleep during the day, so it’s crucial to provide a quiet environment during the day.',
      translation: '예를 들어 햄스터는 밤에는 활동적이고 낮에는 잠을 자므로 낮에는 조용한 환경을 제공하는 것이 중요합니다.',
      inLine: true,
    },
    {
      originText: 'Also, their living areas need to be cleaned regularly, and they should be provided with fresh food and water every day.',
      translation: '또한, 생활 공간을 정기적으로 청소하고 매일 신선한 사료와 물을 제공해야 합니다.',
      inLine: true,
    },
    {
      originText: 'One final tip: hamsters have poor vision but have a strong sense of hearing.',
      translation: '마지막으로 한 가지 팁으로, 햄스터는 시력은 좋지 않지만 청각은 매우 뛰어납니다.',
      inLine: true,
    },
    {
      originText:
        'So, try to spend some time talking to them near their cage, and you’ll be amazed at how they recognize your voice and respond to it.',
      translation: '따라서 햄스터 우리 근처에서 햄스터와 대화를 나누면 햄스터가 여러분의 목소리를 인식하고 반응하는 모습에 놀랄 것입니다.',
      inLine: true,
    },
    {
      originText: 'Keep these tips in mind and take responsibility for your hamster’s care.',
      translation: '이 팁을 명심하고 책임감을 가지고 햄스터를 돌보세요.',
      inLine: true,
    },
  ];

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C04/A02/HE2-L01-C04-A02.mp3',
  };

  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} data={data} audioInfo={audioInfo}></HE00501>;
};

export default P04;
