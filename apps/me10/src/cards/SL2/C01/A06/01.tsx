import ME11401, { IData } from '@maidt-cntn/pages/ME-114-01';
import { IAudioPlayerProps, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'The King with Donkey Ears (3)',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/SL2/C01/A06/ME1-SL2-C01-A06-P01.mp3',
    captionSrc: '/SL2/C01/A06/ME1-SL2-C01-A06-P01.srt',
  };

  const imgSrc = '/SL2/C01/A06/ME1-SL2-C01-A06-P01.jpg';
  const imgAlt = [
    '그 나무로 만든 북을 연주하자, The king has donkey ears. 라는 소리가 흘러나오고 사람들은 놀라서 쳐다 본다.',
    '왕이 나무 뒤에 숨어 멀리 군대가 오는 것을 큰 귀로 듣고 있다.',
  ];

  const data: IData[] = [
    {
      isTitle: true,
      content: `Scene 4 At the king's birthday party`,
      color: 'var(--color-green-600)',
    },
    {
      label: 'Narrator',
      content:
        'It was the king’s birthday. The king invited everyone to his birthday party. Musicians played some music. But the drum made a strange sound.',
    },
    {
      content: 'The king has donkey ears. The king has donkey ears.',
    },
    {
      label: 'Narrator',
      content: 'The king was scared. He ran away to the forest.',
    },
    { content: '' },
    {
      isTitle: true,
      content: 'Scene 5 In the forest',
      color: 'var(--color-green-600)',
    },
    { label: 'Narrator', content: 'In the forest, the king got tired and fell asleep. After a few hours, he woke up.' },
    {
      label: 'King',
      content: (
        <>
          <Typography fontStyle='italic' useGap={false}>
            (Looking at a rabbit)
          </Typography>
          &nbsp; Hmm, your body is so small, but your ears are so big. Still, you are so cute!
          <Typography fontStyle='italic' useGap={false}>
            (Looking at a snake in a tree)
          </Typography>
          &nbsp; You look very different from the rest of the animals. You don’t have any legs, but you can climb a tree so fast!
        </>
      ),
    },
    {
      label: 'Narrator',
      content:
        'Then, he heard a sound from very far away. Another country was going to start a war. He went back to his palace and prepared for war. He was a brave king. He saved his people and his country.',
    },
  ];

  return <ME11401 headerInfo={headerInfo} audioInfo={audioInfo} imgSrc={imgSrc} imgAlt={imgAlt} imgWidth='375px' data={data} labelAlign='right' />;
};

export default P01;
