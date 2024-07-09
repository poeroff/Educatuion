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
    audioSrc: '/L01/C12/A03/ME1-L01-C12-A03-P02.mp3',
  };

  const data: IListenAndAnswer[] = [
    {
      originText: 'Good morning! My name is Bora Han. I’m your English teacher.',
      translation: '좋은 아침이야! 내 이름은 한보라야. 나는 네 영어 선생님이란다.',
      label: 'W',
      labelColor: 'var(--color-yellow-100)',
    },
    {
      originText: 'Nice to meet you, Ms. Han. I’m Hajin Jo.',
      translation: '만나서 반가워요, 한 선생님. 저는 조하진이에요.',
      label: 'B',
      labelColor: 'var(--color-blue-100)',
    },
    {
      originText: 'Nice to meet you, too.',
      translation: '나도 만나서 반갑구나.',
      label: 'W',
      labelColor: 'var(--color-yellow-100)',
    },
  ];
  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} data={data} />;
};

export default P02;
