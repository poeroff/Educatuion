import { TMainHeaderInfoTypes, IAudioPlayerProps } from '@maidt-cntn/ui';
import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo = {
    text: 'Scripts',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C03/A02/HE2-L03-C03-A02-01.mp3',
    captionSrc: '/L03/C03/A02/HE2-L03-C03-A02-01.srt',
  };

  const WLabel = {
    label: 'W',
    labelColor: 'var(--color-blue-100)',
  };

  const BLabel = {
    label: 'B',
    labelColor: 'var(--color-yellow-100)',
  };

  const noLabel = {
    inLine: true,
  };

  const data: IListenAndAnswer[] = [
    {
      originText: 'Hi, there!',
      translation: '안녕하세요!',
      ...WLabel,
    },
    {
      originText: 'Welcome to the Yeosu Park Music Festival.',
      translation: '여수 공원 뮤직 페스티벌에 오신 것을 환영합니다.',
      ...noLabel,
    },
    {
      originText: 'Can I see your ticket, please?',
      translation: '티켓 좀 보여주시겠어요?',
      ...noLabel,
    },
    {
      originText: 'Sure, here it is.',
      translation: '네, 여기 있습니다.',
      ...BLabel,
    },
    {
      originText: 'Thank you.',
      translation: '감사합니다.',
      ...WLabel,
    },
    {
      originText: 'Please put this band on your wrist.',
      translation: '이 밴드를 손목에 채워주세요.',
      ...noLabel,
    },
    {
      originText: 'Wait, hold on one second.',
      translation: '잠깐만요, 잠깐만요.',
      ...noLabel,
    },
    {
      originText: "I'm afraid you're not allowed to bring long umbrellas inside for safety reasons.",
      translation: '안전상의 이유로 긴 우산은 기내에 반입하실 수 없습니다.',
      ...noLabel,
    },
    {
      originText: "You're welcome to leave it in one of the lockers near the entrance if you'd like.",
      translation: '원하신다면 입구 근처에 있는 사물함에 맡기셔도 됩니다.',
      ...noLabel,
    },
    {
      originText: 'Oh, sorry, I had no idea.',
      translation: '아, 죄송해요, 몰랐네요.',
      ...BLabel,
    },
    {
      originText: 'But what if it rains later on?',
      translation: '하지만 나중에 비가 오면 어떻게 하나요?',
      ...noLabel,
    },
    {
      originText: 'I heard that it might rain this afternoon.',
      translation: '오늘 오후에 비가 온다고 들었는데요.',
      ...noLabel,
    },
    {
      originText: "Don't worry, you can always get a rain poncho at the information center outside.",
      translation: '걱정하지 마세요, 밖에 있는 안내소에서 우비를 빌릴 수 있으니까요.',
      ...WLabel,
    },
    {
      originText: 'You just have to show your wrist band to re-enter.',
      translation: '손목 밴드를 보여주면 다시 입장할 수 있어요.',
      ...noLabel,
    },
    {
      originText: 'Okay.',
      translation: '알았어요.',
      ...BLabel,
    },
    {
      originText: 'One more thing, can I bring my own food in?',
      translation: '한 가지 더요. 음식물 반입이 가능한가요?',
      ...noLabel,
    },
    {
      originText: "Unfortunately, nothing is allowed to be brought inside except for water, I'm afraid.",
      translation: '안타깝게도 물 외에는 반입할 수 없습니다.',
      ...WLabel,
    },
    {
      originText: 'You can buy food and drinks at the food stands in the park, though.',
      translation: '하지만 공원 내 매점에서 음식과 음료를 구입할 수 있습니다.',
      ...noLabel,
    },
    {
      originText: 'Okay, thank you!',
      translation: '알겠습니다, 감사합니다!',
      ...BLabel,
    },
  ];

  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} data={data} />;
};

export default P02;
