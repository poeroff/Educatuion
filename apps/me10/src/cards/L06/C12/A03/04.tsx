import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import { IAudioPlayerProps, IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listening',
  };

  const questionInfo: IQuestionProps = {
    text: 'Scripts',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L06/C12/A03/ME1-L06-C12-A03-P04.mp3',
  };

  const data: IListenAndAnswer[] = [
    {
      originText: 'What are you doing, Taeho?',
      translation: '태호야, 너는 무엇을 하고 있니?',
      label: 'G',
      labelColor: 'var(--color-blue-100)',
    },
    {
      originText: 'I’m looking for guitar lessons.',
      translation: '나는 기타 수업을 알아보고 있어.',
      label: 'B',
      labelColor: 'var(--color-yellow-100)',
    },
    {
      originText: 'Are you interested in playing the guitar?',
      translation: '너는 기타 연주에 관심이 있니?',
      label: 'G',
      labelColor: 'var(--color-blue-100)',
    },
    {
      originText: 'Of course I am.',
      translation: '물론이지.',
      label: 'B',
      labelColor: 'var(--color-yellow-100)',
    },
  ];

  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} data={data} />;
};

export default P02;
