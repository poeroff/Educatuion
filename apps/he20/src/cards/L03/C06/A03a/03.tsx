import { TMainHeaderInfoTypes, IAudioPlayerProps, IQuestionProps } from '@maidt-cntn/ui';
import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';

const headerInfo: TMainHeaderInfoTypes = {
  headerText: 'From Shadows to Spotlights (1)',
};

const questionInfo: IQuestionProps = {
  text: 'Translations',
  size: 'medium',
};

const data: IListenAndAnswer[] = [
  {
    originText: 'Welcome to the Dream Art Gallery!',
    translation: '드림 아트 갤러리에 오신 것을 환영합니다!',
  },
  {
    originText: 'I’m Isabel Williams, the docent for the From Shadows to Spotlights exhibit.',
    translation: '저는 이사벨 윌리엄스, From 그림자에서 스포트라이트까지 전시회의 도슨트입니다. ',
  },
  {
    originText: 'Today, you’re going to meet three amazing artists who never gave up on their art, despite challenges in their lives.',
    translation: '오늘 여러분은 자신의 예술을 포기하지 않은 세 명의 놀라운 예술가들을 만나보려고 합니다.',
  },
  {
    originText: 'Each artist has a unique painting style and story that has made their work highly valued.',
    translation: '각 아티스트는 자신만의 독특한 그림 독특한 그림 스타일과 스토리를 가지고 있으며 높은 가치를 지니고 있습니다.',
  },
  {
    originText: 'Let’s explore each artist’s life and artwork.',
    translation: '각 아티스트의 삶과 작품을 살펴보세요.',
  },
];

const P03 = () => {
  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} data={data} />;
};

export default P03;
