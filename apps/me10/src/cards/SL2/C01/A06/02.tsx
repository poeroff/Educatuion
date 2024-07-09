import HE00502 from '@maidt-cntn/pages/HE-005-02';
import { IQuestionProps, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'The King with Donkey Ears (3)',
  };

  const questionInfo: IQuestionProps = {
    text: '해석을 확인해 봅시다.',
  };

  const data = [
    {
      isTitle: true,
      color: 'var(--color-green-600)',
      content: `Scene 4 At the king's birthday party`,
      desc: '장면 4 왕의 생일 파티에서',
    },
    {
      label: 'Narrator',
      content: `It was the king’s birthday.`,
      desc: '왕의 생일이었어요.',
    },
    { content: 'The king invited everyone to his birthday party.', desc: '왕은 모든 이들을 그의 생일 파티에 초대했어요.' },
    { content: 'Musicians played some music.', desc: '음악가들은 음악을 연주했어요.' },
    { content: 'But the drum made a strange sound.', desc: '그러나 북이 이상한 소리를 냈어요.' },
    { content: 'The king has donkey ears.', desc: '왕은 당나귀 귀를 가졌다.' },
    { content: 'The king has donkey ears.', desc: '왕은 당나귀 귀를 가졌다.' },
    { content: 'The king was scared.', desc: '왕은 겁이 났어요.' },
    { content: 'He ran away to the forest.', desc: '그는 숲으로 도망갔어요.' },

    {
      isTitle: true,
      color: 'var(--color-green-600)',
      content: 'Scene 5 In the forest',
      desc: '장면 5 숲속에서',
    },
    { label: 'Narrator', content: 'In the forest, the king got tired and fell asleep.', desc: '숲속에서, 왕은 피곤해서 잠이 들었어요.' },
    { content: 'After a few hours, he woke up.', desc: '몇 시간 후, 그는 일어났어요.' },
    {
      label: 'King',
      content: (
        <>
          <Typography fontStyle='italic' useGap={false}>
            (Looking at a rabbit)
          </Typography>
          &nbsp; Hmm, your body is so small, but your ears are so big.
        </>
      ),
      desc: (
        <>
          <Typography fontStyle='italic' useGap={false} fontSize='var(--font-size-22)'>
            (토끼를 보면서)
          </Typography>
          &nbsp; 흠, 네 몸은 정말 작은데 귀는 아주 크구나.
        </>
      ),
    },
    { content: 'Still, you are so cute!', desc: '그래도, 너는 정말 귀엽구나!' },
    {
      content: (
        <>
          <Typography fontStyle='italic' useGap={false}>
            (Looking at a snake in a tree)
          </Typography>
          &nbsp; You look very different from the rest of the animals.
        </>
      ),
      desc: (
        <>
          <Typography fontStyle='italic' useGap={false} fontSize='var(--font-size-22)'>
            (나무 위에 있는 뱀을 보면서)
          </Typography>
          &nbsp; 너는 다른 동물들과 매우 다르게 보이는구나.
        </>
      ),
    },
    { content: 'You don’t have any legs, but you can climb a tree so fast!', desc: '너는 다리가 하나도 없지만, 나무에 참 빠르게 올라갈 수 있구나!' },
    { label: 'Narrator', content: 'Then, he heard a sound from very far away.', desc: '그때, 그는 아주 멀리서 어떤 소리를 들었어요.' },
    { content: 'Another country was going to start a war.', desc: '다른 나라가 전쟁을 시작하려 했어요.' },
    { content: 'He went back to his palace and prepared for war.', desc: '그는 궁전으로 돌아가서 전쟁을 준비했어요.' },
    { content: 'He was a brave king.', desc: '그는 용감한 왕이었어요.' },
    { content: 'He saved his people and his country.', desc: '그는 자신의 백성들과 나라를 구했어요.' },
  ];

  return <HE00502 headerInfo={headerInfo} questionInfo={questionInfo} data={data} labelAlign='right' />;
};

export default P02;
