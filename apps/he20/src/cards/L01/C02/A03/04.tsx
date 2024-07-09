import { TMainHeaderInfoTypes, IAudioPlayerProps } from '@maidt-cntn/ui';
import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';

interface IProps {
  headerInfo: TMainHeaderInfoTypes;
  audioInfo: IAudioPlayerProps;
}

const P04 = ({ headerInfo, audioInfo }: IProps) => {
  const questionInfo = {
    text: 'Scripts',
  };

  const data: IListenAndAnswer[] = [
    {
      label: 'B',
      labelColor: 'var(--color-yellow-100)',
      originText: 'Hello, Kelly. What’s up?',
      translation: '안녕, Kelly. 무슨 일이야?',
    },
    {
      label: 'G',
      labelColor: 'var(--color-blue-100)',
      originText: 'Hey, Jun! I just wanted to quickly ask you something.',
      translation: '안녕, 준아! 뭐 좀 물어볼 게 있어.',
    },
    {
      inLine: true,
      originText: 'What are you going to bring to the charity market on Friday?',
      translation: '금요일에 열리는 자선 장터에 뭘 가져올 거야?',
    },
    {
      label: 'B',
      labelColor: 'var(--color-yellow-100)',
      originText: 'Hmm, I’m thinking of bringing something that I don’t use anymore, but I’m not quite sure yet.',
      translation: '음, 더 이상 사용하지 않는 물건을 가져올까 생각 중인데 아직 잘 모르겠어.',
    },
    {
      inLine: true,
      originText: 'What about you?',
      translation: '넌 어때?',
    },
    {
      label: 'G',
      labelColor: 'var(--color-blue-100)',
      originText: 'Well, I’ve had a look around my room for used things, but everything is too worn out.',
      translation: '글쎄, 내 방에 중고 물건이 있는지 둘러봤는데 다 낡아서 못 쓰겠어.',
    },
    {
      inLine: true,
      originText: 'So, I’m thinking of baking some cookies instead. What do you think?',
      translation: '그래서 대신 쿠키를 구워볼까 생각 중이야. 어때?',
    },
    {
      label: 'B',
      labelColor: 'var(--color-yellow-100)',
      originText: 'That sounds great!',
      translation: '그거 좋네!',
    },
    {
      inLine: true,
      originText: 'What kind of cookies?',
      translation: '어떤 쿠키?',
    },
    {
      label: 'G',
      labelColor: 'var(--color-blue-100)',
      originText: 'Probably banana cookies with honey.',
      translation: '아마 꿀을 넣은 바나나 쿠키일 거 같아.',
    },
    {
      inLine: true,
      originText: 'They’re my favorite.',
      translation: '내가 제일 좋아하는 쿠키거든.',
    },
    {
      label: 'B',
      labelColor: 'var(--color-yellow-100)',
      originText: 'Wow, sounds good.',
      translation: '와, 맛있겠다.',
    },
    {
      inLine: true,
      originText: 'By the way, did you know that all the money we earn will be donated to the children’s hospital?',
      translation: '그런데 우리가 번 돈은 모두 어린이 병원에 기부된다는 거 알고 있어?',
    },
    {
      label: 'G',
      labelColor: 'var(--color-blue-100)',
      originText: 'Yeah. It’s great to give back to the local community.',
      translation: '그럼. 지역 사회에 환원하는 건 정말 좋은 일이지.',
    },
    {
      label: 'B',
      labelColor: 'var(--color-yellow-100)',
      originText: 'I agree.I hope the charity market will go well.',
      translation: '나도 동의해. 자선 마켓이 잘 됐으면 좋겠어.',
    },
  ];

  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} data={data} />;
};

export default P04;
