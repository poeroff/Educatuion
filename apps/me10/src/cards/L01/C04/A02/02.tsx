import { TMainHeaderInfoTypes, IAudioPlayerProps, BoxWrap, Box, Label, Typography } from '@maidt-cntn/ui';
import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'My Video Channel: Step 1',
  };

  const questionInfo = {
    text: 'Scripts',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C04/A02/ME1-L01-C04-A02.mp3',
    captionSrc: '/L01/C04/A02/ME1-L01-C04-A02.srt',
  };

  const GLabel = {
    label: 'G',
    labelColor: 'var(--color-yellow-100)',
  };

  const data: IListenAndAnswer[] = [
    {
      ...GLabel,
      originText: 'Hello, everyone.',
      translation: '안녕하세요, 여러분.',
    },
    {
      originText: `I'm Emma.`,
      translation: '저는 Emma입니다.',
      inLine: true,
    },
    {
      originText: 'Welcome to my video channel.',
      translation: '제 비디오 채널에 오신 것을 환영합니다.',
      inLine: true,
    },
    {
      originText: 'I have a dog.',
      translation: '저는 강아지를 기릅니다.',
      inLine: true,
    },
    {
      originText: 'Her name is Apple.',
      translation: '그녀의 이름은 Apple입니다.',
      inLine: true,
    },
    {
      originText: 'I love her.',
      translation: '저는 그녀를 사랑합니다.',
      inLine: true,
    },
    {
      originText: 'My videos are all about her.',
      translation: '제 비디오는 그녀에 대한 모든 것입니다.',
      inLine: true,
    },
    {
      originText: 'Do you like dogs, too?',
      translation: '당신도 강아지를 좋아하나요?',
      inLine: true,
    },
    {
      originText: 'Then please hit the "like" button!',
      translation: '그럼 "좋아요" 버튼을 눌러 주세요!',
      inLine: true,
    },
  ];

  return <HE00501 audioInfo={audioInfo} headerInfo={headerInfo} questionInfo={questionInfo} data={data} />;
};

export default P02;
