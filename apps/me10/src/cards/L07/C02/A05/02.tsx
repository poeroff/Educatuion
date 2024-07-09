import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import { IAudioPlayerProps, IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Check',
    headerPattern: 'icon',
    iconType: 'listeningStrategy',
  };

  const questionInfo: IQuestionProps = {
    text: 'Scripts',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L07/C02/A05/ME1-L07-C02-A05-P02.mp3',
    captionSrc: '/L06/C02/A05/ME1-L07-C02-A05-P02.srt',
  };

  const data: IListenAndAnswer[] = [
    {
      originText: 'Dad, did you hear the news about the fireworks festival?',
      translation: '아빠, 불꽃 축제에 대한 소식 들으셨어요?',
      label: 'G',
      labelColor: 'var(--color-blue-100)',
    },
    {
      originText: `The fireworks festival?`,
      translation: '불꽃 축제?',
      label: 'M',
      labelColor: 'var(--color-yellow-100)',
    },
    {
      originText: `I heard it's happening soon, but can you tell me more about it, Kelly?`,
      translation: '그것이 곧 열린다는 걸 들었는데, 그것에 대해 내게 좀 더 말해 줄 수 있겠니, Kelly?',
      inLine: true,
    },
    {
      originText: `Sure! The festival is going to take place in Busan next weekend.`,
      translation: '그럼요! 그 축제는 다음 주말에 부산에서 열릴 예정이래요.',
      label: 'G',
      labelColor: 'var(--color-blue-100)',
    },
    {
      originText: `You can watch the fireworks from the beach.`,
      translation: '해변에서 불꽃놀이를 볼 수 있어요.',
      inLine: true,
    },
    {
      originText: 'That sounds exciting. Do you want to go there?',
      translation: '그거 재미있겠구나. 너는 거기에 가고 싶니?',
      label: 'M',
      labelColor: 'var(--color-yellow-100)',
    },
    {
      originText: `Of course, I’d love to go! Dad, can we eat some seafood, too?`,
      translation: '당연하죠, 정말 가고 싶어요! 아빠, 우리 해산물도 먹을 수 있나요?',
      label: 'G',
      labelColor: 'var(--color-blue-100)',
    },
    {
      originText: 'Sure, we can. Before the fireworks, let’s have seafood first.',
      translation: '물론, 먹을 수 있지. 불꽃놀이 전에 해산물을 먼저 먹자꾸나.',
      label: 'M',
      labelColor: 'var(--color-yellow-100)',
    },
  ];

  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} data={data} />;
};

export default P02;
