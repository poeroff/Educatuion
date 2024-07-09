import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import { IAudioPlayerProps, IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Listening',
  };

  const questionInfo: IQuestionProps = {
    text: 'Scripts',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L05/C12/A03/ME1-L05-C12-A03-P02.mp3',
  };

  const data: IListenAndAnswer[] = [
    {
      originText: 'What are you going to do this weekend, Anna?',
      translation: 'Anna, 너는 이번 주말에 무엇을 할 거니?',
      label: 'B',
      labelColor: 'var(--color-blue-100)',
    },
    {
      originText: `I’m going to visit my grandparents.`,
      translation: `나는 조부모님을 찾아 뵐 거야.`,
      label: 'G',
      labelColor: 'var(--color-yellow-100)',
    },
    {
      originText: `What about you, Jimin?`,
      translation: `지민아, 너는?`,
      inLine: true,
    },
    {
      originText: 'I’m going to go fishing with my uncle.',
      translation: '나는 삼촌이랑 낚시하러 갈 거야.',
      label: 'B',
      labelColor: 'var(--color-blue-100)',
    },
  ];

  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} data={data} />;
};

export default P02;
