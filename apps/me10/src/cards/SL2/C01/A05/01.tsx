import ME11401 from '@maidt-cntn/pages/ME-114-01';
import { IAudioPlayerProps, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'The King with Donkey Ears (2)',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/SL2/C01/A05/ME1-SL2-C01-A05-P01.mp3',
    captionSrc: '/SL2/C01/A05/ME1-SL2-C01-A05-P01.srt',
  };

  const imgSrc = '/SL2/C01/A05/ME1-SL2-C01-A05-P01.jpg';
  const imgAlt = [
    '이발사가 왕에게 약속을 지키겠다고 말하고 있다.',
    '이발사가 참지 못하고 숲에서 나무에 대고 소리치고 있고, 이후에 나무꾼이 와서 그 나무를 베어낸다.',
  ];

  const data = [
    {
      isTitle: true,
      content: 'Scene 1 At the palace',
      color: '#EB6707',
    },
    {
      label: 'King',
      content: 'Can’t you see my ears? You don’t look surprised at all.',
    },
    {
      label: 'Barber',
      content: 'No. I’m just a barber. I only cut hair.',
    },
    {
      label: 'King',
      content: 'Hmm … I like you. But I have to send you to prison after my haircut.',
    },
    {
      label: 'Barber',
      content: 'Oh, my king, I have a sick mother. I must go back home. Your secret is safe with me.',
    },
    {
      label: 'King',
      content: 'Then promise you’ll never tell anyone!',
    },
    {
      label: 'Barber',
      content: 'Of course I won’t tell! I’ll keep my promise.',
    },
    {
      content: '',
    },
    {
      isTitle: true,
      content: `Scene 2 At the barber's house`,
      color: '#EB6707',
    },
    {
      label: 'Barber',
      content: (
        <>
          <Typography fontStyle='italic' useGap={false}>
            (In bed)
          </Typography>
          &nbsp; I can’t sleep! The king has donkey ears! But I can’t tell anyone.
          <Typography fontStyle='italic' useGap={false}>
            (After some time)
          </Typography>
          &nbsp; Oh, I have an idea!
          <Typography fontStyle='italic' useGap={false}>
            (He runs to the forest.)
          </Typography>
        </>
      ),
    },
    {
      label: 'Woodcutter',
      content: (
        <>
          I like this tree. I can make a wonderful drum out of it.
          <Typography fontStyle='italic' useGap={false}>
            (He cuts down the tree.)
          </Typography>
        </>
      ),
    },
    {
      content: '',
    },
    {
      isTitle: true,
      content: 'Scene 3 In the forest',
      color: '#EB6707',
    },
    {
      label: 'Barber',
      content: (
        <>
          <Typography fontStyle='italic' useGap={false}>
            (Shouting to a tree)
          </Typography>
          &nbsp; The king has donkey ears! The king has donkey ears! I feel better now.
          <Typography fontStyle='italic' useGap={false}>
            (Later a woodcutter comes to the forest.)
          </Typography>
        </>
      ),
    },
    {
      label: 'Woodcutter',
      content: (
        <>
          I like this tree. I can make a wonderful drum out of it.
          <Typography fontStyle='italic' useGap={false}>
            (He cuts down the tree.)
          </Typography>
        </>
      ),
    },
  ];

  return <ME11401 headerInfo={headerInfo} audioInfo={audioInfo} imgSrc={imgSrc} imgAlt={imgAlt} imgWidth='300px' data={data} labelAlign='right' />;
};

export default P01;
