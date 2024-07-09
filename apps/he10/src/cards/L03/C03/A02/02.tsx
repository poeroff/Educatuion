import { TMainHeaderInfoTypes, IAudioPlayerProps, IQuestionProps } from '@maidt-cntn/ui';
import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';

const headerInfo: TMainHeaderInfoTypes = {
  headerText: 'Listen and Answer',
};

const questionInfo: IQuestionProps = {
  text: 'Scripts',
};

const audioInfo: IAudioPlayerProps = {
  audioSrc: '/L03/C03/A02/HE1-L03-C03-A02-01.mp3',
  captionSrc: '/L03/C03/A02/HE1-L03-C03-A02-01.srt',
};

const data: IListenAndAnswer[] = [
  {
    originText: 'Lian, have you ever heard of Frances Gabe?',
    translation: 'Lian, Frances Gabe에 대해 들어본 적 있어?',
    label: 'G',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: 'No, I haven’t.',
    translation: '아니, 못 들어봤어.',
    label: 'B',
    labelColor: 'var(--color-yellow-100)',
  },
  {
    originText: 'Who is that?',
    translation: '그게 누군데?',
    inLine: true,
  },
  {
    originText: 'She was an amazing American woman who invented a self-cleaning house during the 1980s.',
    translation: '그녀는 1980년대에 자동 청소기를 발명한 놀라운 미국 여성이야.',
    label: 'G',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: 'Really? ',
    translation: '정말?',
    label: 'B',
    labelColor: 'var(--color-yellow-100)',
  },
  {
    originText: 'That sounds incredible! ',
    translation: '대단한 것 같아!',
    inLine: true,
  },
  {
    originText: 'But was it just a model house, or did she actually live inside?',
    translation: '근데 그냥 모델하우스였어? 아니면 실제로 그 안에 살았어?',
    inLine: true,
  },
  {
    originText: 'It was real! ',
    translation: '진짜지! ',
    label: 'G',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: 'She actually lived there. ',
    translation: '실제로 거기 살았어.',
    inLine: true,
  },
  {
    originText: 'The house was two stories high and about 93㎡ in size.',
    translation: '집은 2층 높이의 약 93㎡ 크기였어.',
    inLine: true,
  },
  {
    originText: 'Wow, that’s a pretty big house!',
    translation: '와, 꽤 큰 집이네! ',
    label: 'B',
    labelColor: 'var(--color-yellow-100)',
  },
  {
    originText: 'I’m curious about how the self-cleaning system worked.',
    translation: '셀프 청소 시스템은 어떻게 작동하는지 궁금해.',
    inLine: true,
  },
  {
    originText: 'A network of tubes and sprayers released soapy water all over the house, including the floors, walls, and ceilings.',
    translation: '튜브와 분무기로 구성된 네트워크가 바닥, 벽, 천장을 포함한 집안 곳곳에 비눗물을 분사했어.',
    label: 'G',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: 'After that, the system automatically washed away the dirty water.',
    translation: '그 후 시스템이 자동으로 더러운 물을 씻어냈어.',
    inLine: true,
  },
  {
    originText: 'That’s amazing. ',
    translation: '놀랍다.',
    label: 'B',
    labelColor: 'var(--color-yellow-100)',
  },
  {
    originText: 'I wish I could live in that house.',
    translation: '저 집에 살 수 있으면 좋겠어.',
    inLine: true,
  },
  {
    originText: 'Then I would never have to clean my room!',
    translation: '그러면 방 청소를 할 필요가 없겠네!',
    inLine: true,
  },
];

const P02 = () => {
  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} data={data} />;
};

export default P02;
