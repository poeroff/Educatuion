import { TMainHeaderInfoTypes, IAudioPlayerProps, Box, Scroll, Typography, PinchZoom, Image } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

interface IContentInfo {
  id: string;
  altText?: string;
  text?: React.ReactNode;
  imageSrc?: string;
  imageHeight?: string;
  label?: string;
  title?: string;
  color?: string;
}

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'The King with Donkey Ears (전체 읽기)',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/SL2/C01/A03/ME1-SL2-C01-A03-P01.mp3',
    captionSrc: '/SL2/C01/A03/ME1-SL2-C01-A03-P01.srt',
  };

  const contentInfo: IContentInfo[] = [
    {
      id: `P0`,
      imageSrc: '/SL2/C01/A03/ME1-SL2-C01-A03-1.jpg',
      altText: '등장인물, Narrator, King, Barber, Woodcutter, People',
      imageHeight: '180px',
    },
    {
      id: `P1`,
      label: 'narrator',
      text: 'Once upon a time, there was a king with big donkey ears. He always hid his ears. It was a big secret. Every month, the king got a haircut. \nAfter his haircut, he always sent the barber to prison. Then one day, a young barber came to the palace.',
    },
    {
      id: `P2`,
      imageSrc: '/SL2/C01/A03/ME1-SL2-C01-A03-2.jpg',
      altText: '왕이 거울로 자신이 귀를 숨긴 모습을 보고 있다.',
      imageHeight: '320px',
    },
    {
      id: `P3`,
      title: 'Scene 1 At the palace',
      color: '#EB6707',
    },
    {
      id: `P4`,
      label: 'King',
      text: 'Can’t you see my ears? You don’t look surprised at all.',
    },
    {
      id: `P4`,
      label: 'Barber',
      text: 'No. I’m just a barber. I only cut hair.',
    },
    {
      id: `P5`,
      label: 'King',
      text: 'Hmm ... I like you. But I have to send you to prison after my haircut.',
    },
    {
      id: `P6`,
      label: 'Barber',
      text: 'Oh, my king, I have a sick mother. I must go back home. Your secret is safe with me.',
    },
    {
      id: `P7`,
      label: 'King',
      text: 'Then promise you’ll never tell anyone!',
    },
    {
      id: `P8`,
      label: 'Barber',
      text: 'Of course I won’t tell! I’ll keep my promise.',
    },
    {
      id: `P9`,
      imageSrc: '/SL2/C01/A03/ME1-SL2-C01-A03-3.jpg',
      altText:
        '이발사가 왕에게 약속을 지키겠다고 말하고 있다. 이발사가 참지 못하고 숲에서 나무에 대고 소리치고 있고, 이후에 나무꾼이 와서 그 나무를 베어낸다.',
      imageHeight: '320px',
    },
    {
      id: `P10`,
      title: `Scene 2 At the barber's house`,
      color: '#EB6707',
    },
    {
      id: `P11`,
      label: 'Barber',
      text: (
        <>
          <Typography fontStyle='italic' useGap={false}>
            (In bed)
          </Typography>{' '}
          I can’t sleep! The king has donkey ears! But I can’t tell anyone.{' '}
          <Typography fontStyle='italic' useGap={false}>
            (After some time)
          </Typography>{' '}
          Oh, I have an idea!
          <Typography fontStyle='italic' useGap={false}>
            (He runs to the forest.)
          </Typography>
        </>
      ),
    },
    {
      id: `P12`,
      title: `Scene 3 In the forest`,
      color: '#EB6707',
    },
    {
      id: `P13`,
      label: 'Barber',
      text: (
        <>
          <Typography fontStyle='italic' useGap={false}>
            (Shouting to a tree)
          </Typography>{' '}
          The king has donkey ears! The king has donkey ears! I feel better now.
          <Typography fontStyle='italic' useGap={false}>
            (Later a woodcutter comes to the forest.)
          </Typography>
        </>
      ),
    },
    {
      id: `P14`,
      label: 'Woodcutter',
      text: (
        <>
          I like this tree. I can make a wonderful drum out of it.{' '}
          <Typography fontStyle='italic' useGap={false}>
            (He cuts down the tree.)
          </Typography>
        </>
      ),
    },
    {
      id: `P15`,
      imageSrc: '/SL2/C01/A03/ME1-SL2-C01-A03-4.jpg',
      altText: '그 나무로 만든 북을 연주하자, The king has donkey ears. 라는 소리가 흘러나오고 사람들은 놀라서 쳐다 본다.',
      imageHeight: '320px',
    },
    {
      id: `P16`,
      title: `Scene 4 At the king's birthday party`,
      color: 'var(--color-green-800)',
    },
    {
      id: `P17`,
      label: 'Narrator',
      text: 'It was the king’s birthday. The king invited everyone to his birthday party. Musicians played some music. But the drum made a strange sound.\nThe king was scared. He ran away to the forest.',
    },
    {
      id: `P18`,
      imageSrc: '/SL2/C01/A03/ME1-SL2-C01-A03-5.jpg',
      altText: '왕이 나무 뒤에 숨어 멀리 군대가 오는 것을 큰 귀로 듣고 있다.',
      imageHeight: '320px',
    },
    {
      id: `P19`,
      title: `Scene 5 In the forest`,
      color: 'var(--color-green-800)',
    },
    {
      id: `P20`,
      label: 'Narrator',
      text: 'In the forest, the king got tired and fell asleep. After a few hours, he woke up.',
    },
    {
      id: `P21`,
      label: 'King',
      text: (
        <>
          <Typography fontStyle='italic' useGap={false}>
            (Looking at a rabbit)
          </Typography>{' '}
          Hmm, your body is so small, but your ears are so big. Still, you are so cute!{' '}
          <Typography fontStyle='italic' useGap={false}>
            (Looking at a snake in a tree)
          </Typography>{' '}
          You look very different from the rest of the animals. You don’t have any legs, but you can climb a tree so fast!
        </>
      ),
    },
    {
      id: `P22`,
      label: 'Narrator',
      text: 'Then, he heard a sound from very far away. Another country was going to start a war. He went back to his palace and prepared for war. He was a brave king. He saved his people and his country.',
    },
    {
      id: `P23`,
      imageSrc: '/SL2/C01/A03/ME1-SL2-C01-A03-6.jpg',
      altText: '왕이 환호하는 사람들을 향해 당나귀 귀를 드러내고 웃는다.',
      imageHeight: '320px',
    },
    {
      id: `P24`,
      title: `Scene 6 With the people`,
      color: 'var(--color-pink-600)',
    },
    {
      id: `P25`,
      label: 'People',
      text: 'You’re the bravest king in the world! We love you!',
    },
    {
      id: `P26`,
      label: 'King',
      text: 'I have donkey ears. Don’t you mind?',
    },
    {
      id: `P27`,
      label: 'People',
      text: 'What are you talking about? Thanks to your big ears, we won! You’re the greatest king!',
    },
    {
      id: `P28`,
      label: 'King',
      text: 'Really? You won’t laugh at me? From now on, I won’t hide my ears. In fact, I’m proud of them!',
    },
    {
      id: `P29`,
      label: 'Narrator',
      text: 'The king finally loved himself. The king and his people lived happily ever after.',
    },
  ];

  return (
    <Container headerInfo={headerInfo} audioInfo={audioInfo}>
      <Box background='white' useRound useFull>
        <Scroll height='100%' tabIndex={0}>
          {contentInfo &&
            contentInfo.map((item, index) => (
              <Box key={item.id}>
                <Box textAlign='left' vAlign='top'>
                  {item.label && (
                    <Typography width='20%' align='right' weight={'bold'} color='var(--color-grey-700)'>
                      {item.label}
                    </Typography>
                  )}
                  {item.text && (
                    <Typography usePre width='80%'>
                      {item.text}
                    </Typography>
                  )}
                </Box>

                {item.imageSrc && (
                  <Box vAlign='center' hAlign='center' marginTop={'24px'}>
                    <PinchZoom pinchType={'image'}>
                      <Image alt={item.altText} src={item.imageSrc} height={item.imageHeight} />
                    </PinchZoom>
                  </Box>
                )}

                {item.title && (
                  <Box marginTop={'24px'} hAlign='center'>
                    <Typography weight={'bold'} color={item.color}>
                      {item.title}
                    </Typography>
                  </Box>
                )}
              </Box>
            ))}
        </Scroll>
      </Box>
    </Container>
  );
};

export default P01;
