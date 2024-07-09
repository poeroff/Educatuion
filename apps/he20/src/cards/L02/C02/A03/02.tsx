import { TMainHeaderInfoTypes, IAudioPlayerProps } from '@maidt-cntn/ui';

import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo = {
    text: 'Scripts',
  };

  const data: IListenAndAnswer[] = [
    {
      label: 'W',
      labelColor: 'var(--color-yellow-100)',
      originText: 'Good afternoon.',
      translation: '안녕하세요.',
    },
    {
      inLine: true,
      originText: 'How may I help you?',
      translation: '무엇을 도와드릴까요?',
    },
    {
      label: 'B',
      labelColor: 'var(--color-blue-100)',
      originText: 'Hello, I’d like to buy a sweater that doesn’t feel too tight.',
      translation: '안녕하세요, 너무 꽉 끼지 않는 스웨터를 사고 싶은데요.',
    },
    {
      label: 'W',
      labelColor: 'var(--color-yellow-100)',
      originText: 'I see. What do you think of these wool sweaters on this stand?',
      translation: '그렇군요. 이 매대에 있는 울 스웨터는 어떠세요?',
    },
    {
      inLine: true,
      originText: 'They are all loose-fitting.',
      translation: '모두 헐렁하네요.',
    },
    {
      label: 'B',
      labelColor: 'var(--color-blue-100)',
      originText: 'Hmm. They look good, but I think cotton is more comfortable than wool.',
      translation: '흠. 보기에는 좋지만 울보다는 면이 더 편한 것 같아요.',
    },
    {
      label: 'W',
      labelColor: 'var(--color-yellow-100)',
      originText: 'In that case, how about this one?',
      translation: '그렇다면 이건 어때요?',
    },
    {
      inLine: true,
      originText: 'It’s 100% organic cotton.',
      translation: '100% 오가닉 코튼이에요.',
    },
    {
      label: 'B',
      labelColor: 'var(--color-blue-100)',
      originText: 'Oh, I love it.',
      translation: '오, 마음에 드네요.',
    },
    { inLine: true, originText: 'How much is it?', translation: '얼마예요?' },
    {
      label: 'W',
      labelColor: 'var(--color-yellow-100)',
      originText: 'It was originally 50 dollars, but it’s 20% off right now.',
      translation: '원래는 50달러였는데 지금 20% 할인 중이에요.',
    },
    {
      inLine: true,
      originText: 'Plus, if you download our store app and become a member, you’ll get an additional five-dollar discount coupon.',
      translation: '게다가 스토어 앱을 다운로드하고 회원이 되면 5달러 할인 쿠폰을 추가로 받을 수 있어요.',
    },
    {
      label: 'B',
      labelColor: 'var(--color-blue-100)',
      originText: 'That’s a great deal! ',
      translation: '정말 큰 혜택이네요!',
    },
    {
      inLine: true,
      originText: 'I’ll sign up now and take the sweater.',
      translation: '지금 바로 가입해서 스웨터를 구매할게요.',
    },
  ];

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C02/A03/HE2-L02-C02-A03-01.mp3',
    captionSrc: '/L02/C02/A03/HE2-L02-C02-A03-01.srt',
  };

  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} data={data} />;
};

export default P02;
