import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import { TMainHeaderInfoTypes, IAudioPlayerProps, IQuestionProps } from '@maidt-cntn/ui';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listening',
  };

  const questionInfo: IQuestionProps = {
    text: 'Scripts',
    type: 'text',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C12/A03/ME1-L01-C12-A03-P04.mp3',
  };

  const data: IListenAndAnswer[] = [
    {
      originText: 'Yuna, what’s your favorite subject?',
      translation: '유나야, 네가 가장 좋아하는 과목이 뭐니?',
      label: 'B',
      labelColor: 'var(--color-blue-100)',
    },
    {
      originText: 'I like math. How about you, Dylan?',
      translation: '나는 수학을 좋아해. Dylan, 너는 어떠니?',
      label: 'G',
      labelColor: 'var(--color-yellow-100)',
    },
    {
      originText: 'My favorite subject is science.',
      translation: '내가 가장 좋아하는 과목은 과학이야.',
      label: 'B',
      labelColor: 'var(--color-blue-100)',
    },
  ];
  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} data={data} />;
};

export default P02;
