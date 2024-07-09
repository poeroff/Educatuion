import { TMainHeaderInfoTypes, IAudioPlayerProps, IQuestionProps } from '@maidt-cntn/ui';
import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';

const headerInfo: TMainHeaderInfoTypes = {
  headerText: 'Listening',
};

const questionInfo: IQuestionProps = {
  text: 'Scripts',
};

const audioInfo: IAudioPlayerProps = {
  audioSrc: '/L02/C12/A03/ME1-L02-C12-A03-P02.mp3',
};

const data: IListenAndAnswer[] = [
  {
    label: 'B',
    labelColor: 'var(--color-yellow-100)',
    originText: 'Mom, how’s the weather today?',
    translation: '엄마, 오늘 날씨가 어때요?',
  },
  {
    label: 'W',
    labelColor: 'var(--color-blue-100)',
    originText: 'It’s snowing a lot.',
    translation: '눈이 많이 오고 있어.',
  },
  {
    inLine: true,
    originText: 'But it’s not that cold.',
    translation: '하지만 그렇게 춥지는 않단다.',
  },
  {
    label: 'B',
    labelColor: 'var(--color-yellow-100)',
    originText: 'Great!',
    translation: '좋네요!',
  },
];
const P02 = () => {
  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} data={data} />;
};

export default P02;
