import { IAudioPlayerProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'meListenAndCheck',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L05/C02/A03/ME1-L05-C02-A03-P02.mp3',
    captionSrc: '/L05/C02/A03/ME1-L05-C02-A03-P02.srt',
  };

  const questionInfo = {
    text: 'Scripts',
  };

  const data: IListenAndAnswer[] = [
    {
      label: 'G',
      labelColor: 'var(--color-blue-100)',
      originText: 'Jiho, what are you going to do this weekend?',
      translation: '지호야. 이번 주말에 무엇을 할 거니?',
    },
    {
      label: 'B',
      labelColor: 'var(--color-orange-200)',
      originText: 'I’m going to ride bikes with my brother. Do you have any special plans, Emma?',
      translation: '나는 남동생이랑 자전거를 탈 거야. Emma, 너는 어떤 특별한 계획이 있니?',
    },
    {
      label: 'G',
      labelColor: 'var(--color-blue-100)',
      originText: 'I’m going to go surfing with my family.',
      translation: '나는 가족이랑 서핑 하러 갈 거야.',
    },
    {
      label: 'B',
      labelColor: 'var(--color-orange-200)',
      originText: 'That sounds cool! Are you good at surfing?',
      translation: '멋지다! 너는 서핑을 잘하니?',
    },
    {
      label: 'G',
      labelColor: 'var(--color-blue-100)',
      originText: 'No, I’m not. It’s my first time. My mom is going to teach me.',
      translation: '아니, 못해. 이번이 처음이야. 엄마가 나에게 가르쳐 주실 거야.',
    },
    {
      label: 'B',
      labelColor: 'var(--color-orange-200)',
      originText: 'Wow. Show me some pictures later!',
      translation: '우와. 나중에 나에게 사진을 보여줘!',
    },
  ];

  return <HE00501 headerInfo={headerInfo} audioInfo={audioInfo} questionInfo={questionInfo} data={data} />;
};

export default P02;
