import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import { IAudioPlayerProps, IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

const P04 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Listening',
  };

  const questionInfo: IQuestionProps = {
    text: 'Scripts',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L05/C12/A03/ME1-L05-C12-A03-P04.mp3',
  };

  const data: IListenAndAnswer[] = [
    {
      originText: 'Junho, are you going out?',
      translation: '준호야, 너 외출하니?',
      label: 'W',
      labelColor: 'var(--color-yellow-100)',
    },
    {
      originText: `Yes, Mom.`,
      translation: `네, 엄마.`,
      label: 'B',
      labelColor: 'var(--color-blue-100)',
    },
    {
      originText: 'Why don’t you take an umbrella with you?',
      translation: '우산을 가져가는 게 어떠니?',
      label: 'W',
      labelColor: 'var(--color-yellow-100)',
    },
    {
      originText: `It’s going to rain.`,
      translation: `비가 올 거야.`,
      inLine: true,
    },
    {
      originText: `Okay, I will. Thanks.`,
      translation: `네, 그럴게요. 감사해요.`,
      label: 'B',
      labelColor: 'var(--color-blue-100)',
    },
  ];

  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} data={data} />;
};

export default P04;
