import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import { IQuestionProps, TMainHeaderInfoTypes, IAudioPlayerProps } from '@maidt-cntn/ui';

const P04 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listening',
  };

  const questionInfo: IQuestionProps = {
    text: 'Scripts',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C12/A03/ME1-L04-C12-A03-P04.mp3',
  };

  const data: IListenAndAnswer[] = [
    {
      originText: `Excuse me, I'm looking for the museum. How can I get there?`,
      translation: '실례합니다, 저는 박물관을 찾고 있어요. 거기에 어떻게 가나요?',
      label: 'B',
      labelColor: 'var(--color-blue-100)',
    },
    {
      originText: 'Go straight down to B Street and turn right. It’s on your left.',
      translation: 'B로까지 직진해서 오른쪽으로 도세요. 당신의 왼쪽에 있어요.',
      label: 'G',
      labelColor: 'var(--color-yellow-100)',
    },
    {
      originText: 'Thank you so much. ',
      translation: '정말 감사합니다.',
      label: 'B',
      labelColor: 'var(--color-blue-100)',
    },
  ];
  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} data={data} />;
};

export default P04;
