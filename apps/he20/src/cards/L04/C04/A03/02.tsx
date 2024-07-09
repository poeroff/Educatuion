import { TMainHeaderInfoTypes, IQuestionProps, IAudioPlayerProps, Typography, Scroll, Box } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import styled from '@emotion/styled';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Step 2. Present and Share',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    size: 'large',
    text: 'Listen to the debate.',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C04/A03/HE2-L04-C04-A03.mp3',
    captionSrc: '/L04/C04/A03/HE2-L04-C04-A03.srt',
  };

  const data = (
    <>
      <BoldText>Debate Question:</BoldText>{' '}
      <Typography useGap={false} textDecoration={'underline'} usePre dangerouslySetInnerHTML={{ __html: `Are chatbots helpful for studying?\n` }} />I
      think{' '}
      <Typography useGap={false} textDecoration={'underline'}>
        studying with chatbots{' '}
      </Typography>
      is{' '}
      <Typography useGap={false} textDecoration={'underline'}>
        effective.
      </Typography>{' '}
      It can{' '}
      <Typography useGap={false} textDecoration={'underline'}>
        help students to improve their academic performance
      </Typography>{' '}
      because{' '}
      <Typography
        useGap={false}
        textDecoration={'underline'}
        usePre
        dangerouslySetInnerHTML={{ __html: `they can get personalized support from chatbots.\n\n` }}
      />
      I believe{' '}
      <Typography useGap={false} textDecoration={'underline'}>
        studying with chatbots
      </Typography>{' '}
      is <Typography useGap={false} textDecoration={'underline'} usePre dangerouslySetInnerHTML={{ __html: `not good.\n` }} />
      It can{' '}
      <Typography useGap={false} textDecoration={'underline'}>
        keep students from thinking critically
      </Typography>{' '}
      because{' '}
      <Typography useGap={false} textDecoration={'underline'}>
        they might end up relying on chatbots.
      </Typography>
    </>
  );

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} vAlign='flex-start'>
      <Box background={'white'} useRound useFull>
        <Scroll>{data}</Scroll>
      </Box>
    </Container>
  );
};

const BoldText = styled.span`
  font-weight: var(--font-weight-bold);
  font-size: 32px;
  line-height: 40px;
`;

export default P02;
