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
    audioSrc: '/L07/C12/A03/ME1-L07-C12-A03-P02.mp3',
  };

  const data: IListenAndAnswer[] = [
    {
      label: 'B',
      labelColor: 'var(--color-blue-100)',
      originText: 'Do you know about the Wright Brothers?',
      translation: '너는 라이트 형제에 대해 알고 있니? ',
    },
    {
      originText: 'They invented the airplane.',
      translation: '그들은 비행기를 발명했어.',
      inLine: true,
    },
    {
      originText: 'Thanks to them, we can travel far in a short time.',
      translation: '그들 덕분에, 우리는 짧은 시간에 멀리 여행할 수 있지.',
      inLine: true,
    },
  ];

  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} data={data} />;
};

export default P02;
