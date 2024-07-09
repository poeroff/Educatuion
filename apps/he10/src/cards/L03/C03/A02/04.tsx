import { TMainHeaderInfoTypes, IAudioPlayerProps, IQuestionProps } from '@maidt-cntn/ui';
import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';

const headerInfo: TMainHeaderInfoTypes = {
  headerText: 'Listen and Answer',
};

const questionInfo: IQuestionProps = {
  text: 'Scripts',
};

const audioInfo: IAudioPlayerProps = {
  audioSrc: '/L03/C03/A02/HE1-L03-C03-A02-02.mp3',
  captionSrc: '/L03/C03/A02/HE1-L03-C03-A02-02.srt',
};

const data: IListenAndAnswer[] = [
  {
    originText: 'Welcome to St. Paul’s Cathedral in London.',
    translation: '런던의 St. Paul’s 대성당에 오신 것을 환영합니다.',
    label: 'M',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: 'This is a beautiful place renowned for its stunning architecture, including one of the largest domes in the world.',
    translation: '이곳은 세계에서 가장 큰 돔 중 하나를 포함한 멋진 건축물로 유명한 아름다운 곳입니다.',
    inLine: true,
  },
  {
    originText: 'This grand dome gives you a unique auditory experience.',
    translation: '이 웅장한 돔은 독특한 청각적 경험을 선사합니다.',
    inLine: true,
  },
  {
    originText: 'Have you heard of the Whispering Gallery?',
    translation: 'Whispering Gallery에 대해 들어보셨나요?',
    inLine: true,
  },
  {
    originText: 'It’s a circular wall under the dome of the cathedral.',
    translation: '대성당의 돔 아래 원형 벽으로 이루어져 있어요.',
    inLine: true,
  },
  {
    originText: 'If you whisper on one side of the wall, someone on the other side can hear it.',
    translation: '벽의 한쪽에서 속삭이면 다른 쪽에 있는 사람이 들을 수 있어요.',
    inLine: true,
  },
  {
    originText: 'That’s because sound waves travel along the curved wall and reach the opposite side.',
    translation: '음파가 곡선 벽을 따라 이동하면서 반대편에 도달하기 때문이죠.',
    inLine: true,
  },
  {
    originText: 'Isn’t that incredible?',
    translation: '놀랍지 않나요?',
    inLine: true,
  },
  {
    originText: 'I highly recommend that you visit the Whispering Gallery after this guided tour and try it out for yourself.',
    translation: '가이드 투어가 끝나면 Whispering Gallery를 방문해 직접 체험해 보시길 강력히 추천합니다.',
    inLine: true,
  },
];

const P04 = () => {
  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} data={data} />;
};

export default P04;
