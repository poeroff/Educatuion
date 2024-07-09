import { IAudioPlayerProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'meListenAndCheck',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C02/A03/ME1-L04-C02-A03-P02.mp3',
    captionSrc: '/L04/C02/A03/ME1-L04-C02-A03-P02.srt',
  };

  const questionInfo = {
    text: 'Scripts',
  };

  const data: IListenAndAnswer[] = [
    {
      label: 'G',
      labelColor: 'var(--color-orange-200)',
      originText: 'Are you free this Sunday? I have two tickets for the Team Top concert.',
      translation: '이번 주 일요일에 시간 있니? 내게 팀 탑 콘서트 표가 두 장 있어.',
    },
    {
      label: 'B',
      labelColor: 'var(--color-blue-100)',
      originText: 'Where will the concert take place?',
      translation: '콘서트가 어디에서 열려?',
    },
    {
      label: 'G',
      labelColor: 'var(--color-orange-200)',
      originText: 'It’ll be at the Olympic Park. Can you come with me?',
      translation: '올림픽 공원에서 열려. 나랑 같이 갈 수 있어?',
    },
    {
      label: 'B',
      labelColor: 'var(--color-blue-100)',
      originText: 'Of course. I’m so excited! What time will it start?',
      translation: '물론이지. 정말 기대돼! 몇 시에 시작해?',
    },
    {
      label: 'G',
      labelColor: 'var(--color-orange-200)',
      originText: 'It’ll start at 5 p.m.',
      translation: '오후 5시에 시작해. ',
    },
  ];

  return <HE00501 headerInfo={headerInfo} audioInfo={audioInfo} questionInfo={questionInfo} data={data} />;
};

export default P02;
