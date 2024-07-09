import HE00502 from '@maidt-cntn/pages/HE-005-02';
import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'The King with Donkey Ears (4)',
  };

  const questionInfo: IQuestionProps = {
    text: '해석을 확인해 봅시다.',
  };

  const data = [
    {
      isTitle: true,
      color: 'var(--color-pink-600)',
      content: `Scene 6 With the people`,
      desc: '장면 6 백성들과 함께',
    },
    {
      label: 'People',
      content: `You're the bravest king in the world!`,
      desc: '전하께서는 세상에서 가장 용감한 왕이십니다!',
    },
    {
      content: 'We love you!',
      desc: '저희는 전하를 사랑합니다!',
    },
    {
      label: 'King',
      content: 'I have donkey ears.',
      desc: '나는 당나귀 귀를 가지고 있다.',
    },
    {
      content: 'Don’t you mind?',
      desc: '신경 쓰이지 않는가?',
    },
    {
      label: 'People',
      content: 'What are you talking about?',
      desc: '무슨 말씀을 하시는 것인지요?',
    },
    {
      content: 'Thanks to your big ears, we won!',
      desc: '전하의 큰 귀 덕분에, 저희가 이겼습니다!',
    },
    {
      content: `You're the greatest king!`,
      desc: '전하께서는 가장 위대한 왕이십니다!',
    },
    {
      label: 'King',
      content: `Really? You won't laugh at me?`,
      desc: '정말인가? 나를 비웃지 않을 것인가?',
    },
    {
      content: `From now on, I won’t hide my ears.`,
      desc: '이제부터, 나는 나의 귀를 감추지 않겠다.',
    },
    {
      content: `In fact, I'm proud of them!`,
      desc: '사실, 나는 나의 귀가 자랑스럽다!',
    },
    {
      label: 'Narrator',
      content: 'The king finally loved himself.',
      desc: '왕은 마침내 자신을 사랑하게 되었어요.',
    },
    {
      content: 'The king and his people lived happily ever after.',
      desc: '왕과 그의 백성들은 그 후 평생 행복하게 살았답니다.',
    },
  ];

  return <HE00502 headerInfo={headerInfo} questionInfo={questionInfo} data={data} labelAlign='right' />;
};

export default P02;
