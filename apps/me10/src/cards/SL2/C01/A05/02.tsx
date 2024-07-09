import HE00502 from '@maidt-cntn/pages/HE-005-02';
import { IQuestionProps, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'The King with Donkey Ears (2)',
  };

  const questionInfo: IQuestionProps = {
    text: '해석을 확인해 봅시다.',
  };

  const data = [
    { isTitle: true, color: '#EB6707', content: 'Scene 1 At the palace', desc: '장면 1 궁전에서' },
    { label: 'King', labelBgColor: '', content: 'Can’t you see my ears?', desc: '너는 내 귀가 안 보이느냐?' },
    { content: 'You don’t look surprised at all.', desc: '너는 전혀 놀란 것 같지 않구나.' },
    { label: 'Barber', content: 'No. I’m just a barber.', desc: '아닙니다. 저는 단지 이발사일 뿐입니다.' },
    { content: 'I only cut hair.', desc: '저는 오로지 이발만 합니다.' },
    { label: 'King', content: 'Hmm… I like you.', desc: '음… 나는 네가 마음에 드는구나.' },
    { content: 'But I have to send you to prison after my haircut.', desc: '그러나 나는 이발 후에 너를 감옥으로 보내야만 한다.' },
    { label: 'Barber', content: 'Oh, my king, I have a sick mother.', desc: '오, 나의 왕이시여, 저에게는 편찮으신 어머니가 계십니다.' },
    { content: 'I must go back home.', desc: '저는 꼭 집으로 돌아가야 합니다.' },
    { content: 'Your secret is safe with me.', desc: '전하의 비밀은 저와 함께라면 안전합니다.' },
    { label: 'King', content: 'Then promise you’ll never tell anyone!', desc: '그러면 아무에게도 말하지 않겠다는 약속을 하여라!' },
    { label: 'Barber', content: 'Of course I won’t tell!', desc: '물론 말하지 않겠습니다!' },
    { content: 'I’ll keep my promise.', desc: '저는 약속을 지키겠습니다.' },

    { isTitle: true, color: '#EB6707', content: `Scene 2 At the barber's house`, desc: '장면 2 이발사의 집에서' },
    {
      label: 'Barber',
      content: (
        <>
          <Typography fontStyle='italic' useGap={false}>
            (In bed)
          </Typography>
          &nbsp; I can’t sleep!
        </>
      ),
      desc: (
        <>
          <Typography fontStyle='italic' useGap={false} fontSize='var(--font-size-22)'>
            (침대에서)
          </Typography>
          &nbsp; 잠을 잘 수가 없네!
        </>
      ),
    },
    { content: `But I can't tell anyone.`, desc: '그러나 나는 아무에게도 말할 수 없지.' },
    {
      content: (
        <>
          <Typography fontStyle='italic' useGap={false}>
            (After some time)
          </Typography>
          &nbsp; Oh, I have an idea! &nbsp;
          <Typography fontStyle='italic' useGap={false}>
            (He runs to the forest.)
          </Typography>
        </>
      ),
      desc: (
        <>
          <Typography fontStyle='italic' useGap={false} fontSize='var(--font-size-22)'>
            (잠시 뒤)
          </Typography>
          &nbsp; 오, 생각이 났어! &nbsp;
          <Typography fontStyle='italic' useGap={false} fontSize='var(--font-size-22)'>
            (숲으로 달려간다.)
          </Typography>
        </>
      ),
    },

    { isTitle: true, content: 'Scene 3 In the forest', desc: '장면 3 숲 속에서', color: '#EB6707' },
    {
      label: 'Barber',
      content: (
        <>
          <Typography fontStyle='italic' useGap={false}>
            (Shouting to a tree)
          </Typography>
          &nbsp; The king has donkey ears!
        </>
      ),
      desc: (
        <>
          <Typography fontStyle='italic' useGap={false} fontSize='var(--font-size-22)'>
            (나무에 대고 소리 지르며)
          </Typography>
          &nbsp; 왕은 당나귀 귀를 가졌다!
        </>
      ),
    },
    { content: 'The king has donkey ears!', desc: '왕은 당나귀 귀를 가졌다!' },
    {
      content: (
        <>
          I feel better now. &nbsp;
          <Typography fontStyle='italic' useGap={false}>
            (Later a woodcutter comes to the forest.)
          </Typography>
        </>
      ),
      desc: (
        <>
          이제 기분이 좀 낫네. &nbsp;
          <Typography fontStyle='italic' useGap={false} fontSize='var(--font-size-22)'>
            (나중에 나무꾼이 숲으로 온다.)
          </Typography>
        </>
      ),
    },
    {
      label: 'Woodcutter',
      content: 'I like this tree.',
      desc: '이 나무가 마음에 드는걸.',
    },
    {
      content: (
        <>
          I can make a wonderful drum out of it. &nbsp;
          <Typography fontStyle='italic' useGap={false}>
            (He cuts down the tree.)
          </Typography>
        </>
      ),
      desc: (
        <>
          그것으로 훌륭한 북을 만들 수 있겠어. &nbsp;
          <Typography fontStyle='italic' useGap={false} fontSize='var(--font-size-22)'>
            (나무꾼이 나무를 자른다.)
          </Typography>
        </>
      ),
    },
  ];

  return <HE00502 headerInfo={headerInfo} questionInfo={questionInfo} labelAlign='right' data={data} />;
};

export default P02;
