import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import { TMainHeaderInfoTypes, IAudioPlayerProps } from '@maidt-cntn/ui';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Weather Report: Step 1',
  };

  const questionInfo = {
    text: 'Scripts',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C04/A02/ME1-L02-C04-A02.mp3',
    captionSrc: '/L02/C04/A02/ME1-L02-C04-A02.srt',
  };

  const labelW = {
    label: 'W',
    labelColor: 'var(--color-blue-100)',
  };

  const data: IListenAndAnswer[] = [
    {
      ...labelW,
      originText: 'Good morning.',
      translation: '안녕하세요.',
    },
    {
      originText: 'Welcome to the World Weather Report.',
      translation: 'World Weather Report에 오신 것을 환영합니다.',
      inLine: true,
    },
    {
      originText: 'I’m Elsa in Kiruna, Sweden.',
      translation: '저는 스웨덴 키루나에 있는 Elsa입니다.',
      inLine: true,
    },
    {
      originText: 'It’s spring, but it’s still cold.',
      translation: '봄이지만 여전히 춥습니다.',
      inLine: true,
    },
    {
      originText: 'Right now, I’m standing outside the Ice Hotel.',
      translation: '저는 지금 아이스 호텔 밖에 서 있습니다.',
      inLine: true,
    },
    {
      originText: 'It’s snowing heavily.',
      translation: '눈이 아주 많이 오고 있습니다.',
      inLine: true,
    },
    {
      originText: 'Many people are skating and enjoying ice fishing.',
      translation: '많은 사람들이 스케이트를 타고 얼음낚시를 즐기고 있습니다.',
      inLine: true,
    },
    {
      originText: 'That’s the weather report for today.',
      translation: '지금까지 오늘의 날씨 예보였습니다.',
      inLine: true,
    },
  ];

  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} data={data} />;
};

export default P02;
