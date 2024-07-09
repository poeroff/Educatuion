import { TMainHeaderInfoTypes, IAudioPlayerProps, IQuestionProps } from '@maidt-cntn/ui';
import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';

const headerInfo: TMainHeaderInfoTypes = {
  headerText: 'Listen and Answer',
};

const questionInfo: IQuestionProps = {
  text: 'Scripts',
  size: 'medium',
};

const audioInfo: IAudioPlayerProps = {
  audioSrc: '/L01/C03/A02/HE2-L01-C03-A02-01.mp3',
  captionSrc: '/L01/C03/A02/HE2-L01-C03-A02-01.srt',
};

const data: IListenAndAnswer[] = [
  {
    originText: `Hey, Mike, take a look at this picture.`,
    translation: `아, Mike, 이 사진 한번 봐.`,
    label: 'G',
    labelColor: 'var(--color-yellow-100)',
  },
  {
    originText: `Can you guess what it is?`,
    translation: `이게 뭔지 짐작이 가?`,
    inLine: true,
  },
  {
    originText: `Isn’t it just a bridge over a road?`,
    translation: `그냥 도로 위에 놓인 다리 아닌가?`,
    label: 'B',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: `Actually, it’s a wildlife crossing: a kind of bridge that allows animals to cross roads safely.`,
    translation: `사실, 동물들이 안전하게 도로를 건널 수 있게 해주는 일종의 야생동물 건널목이야.`,
    label: 'G',
    labelColor: 'var(--color-yellow-100)',
  },
  {
    originText: `It’s built to restore and reconnect habitats that have been separated due to road construction.`,
    translation: `도로 건설로 인해 단절된 서식지를 복원하고 다시 연결하기 위해 건설된 것이지.`,
    inLine: true,
  },
  {
    originText: `Ah, I remember seeing one of those on the highway to Busan.`,
    translation: `아, 부산 가는 고속도로에서 본 기억이 나네.`,
    label: 'B',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: `Right.`,
    translation: `맞아.`,
    label: 'G',
    labelColor: 'var(--color-yellow-100)',
  },
  {
    originText: `So many animals are being killed on roads, so I think it’s important to have as many wildlife crossings as possible throughout the country.`,
    translation: `도로에서 많은 동물들이 죽어가고 있기 때문에 전국에 야생동물 횡단도로를 최대한 많이 만드는 게 중요하다고 생각해.`,
    inLine: true,
  },
  {
    originText: `I understand.`,
    translation: `무슨 말인지 알겠어.`,
    label: 'B',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: `It’s necessary for the safety of drivers as well as for animals, isn’t it?`,
    translation: `동물뿐만 아니라 운전자들의 안전을 위해서도 필요한 거지?`,
    inLine: true,
  },
  {
    originText: `You’re absolutely right.`,
    translation: `네 말이 전적으로 맞아.`,
    label: 'G',
    labelColor: 'var(--color-yellow-100)',
  },
];

const P02 = () => {
  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} data={data} />;
};

export default P02;
