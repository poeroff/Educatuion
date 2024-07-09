import { TMainHeaderInfoTypes, Typography, List, Box, SimpleAudioPlayer, IQuestionProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

interface IListen {
  id: number;
  content: React.ReactNode;
  audioSrc: string;
}

const P08 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 주요 내용 이해하기',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: (
      <Box vAlign={'start'} flexDirection={'column'}>
        <Typography weight={700} fontSize={'32px'}>
          ▪ 만족 · 불만족 표현하기
        </Typography>
        <Typography color={'var(--color-blue-900)'}>I’m (not) satisfied with~ 를 사용하여 만족이나 불만족을 표현할 수 있다.</Typography>
      </Box>
    ),
  };

  const data: IListen[] = [
    {
      id: 1,
      content: (
        <Box>
          <Box vAlign='center'>
            <Typography useGap={false}>
              I{' '}
              <Typography useGap={false} weight={'var(--font-weight-bold)'}>
                was
              </Typography>{' '}
              <Typography useGap={false}>pretty</Typography>{' '}
              <Typography useGap={false} weight={'var(--font-weight-bold)'}>
                satisfied with
              </Typography>{' '}
              <Typography useGap={false}>it.</Typography>
            </Typography>
          </Box>
          <Typography>나는 그것에 꽤 만족했어.</Typography>
        </Box>
      ),
      audioSrc: '/L02/SP01-1/HE2-L02-SP01-1-P08-01.mp3',
    },
    {
      id: 2,
      content: (
        <Box>
          <Box vAlign='center'>
            <Typography useGap={false}>
              I{' '}
              <Typography useGap={false} weight={'var(--font-weight-bold)'}>
                wasn’t
              </Typography>{' '}
              <Typography useGap={false}>that</Typography>{' '}
              <Typography useGap={false} weight={'var(--font-weight-bold)'}>
                satisfied with
              </Typography>{' '}
              <Typography useGap={false}>it.</Typography>
            </Typography>
          </Box>
          <Typography>나는 그것에 그렇게 만족하지 않았어.</Typography>
        </Box>
      ),
      audioSrc: '/L02/SP01-1/HE2-L02-SP01-1-P08-02.mp3',
    },
  ];

  return (
    <>
      <Container headerInfo={headerInfo} questionInfo={questionInfo} useExtend>
        <List data={data}>
          {({ value, index }) => (
            <Box hAlign='space-between' gap={'10px'} key={`index${value?.id ?? index}`}>
              <Box vAlign='baseline'>{value?.content}</Box>
              <Box vAlign='center' gap={'4px'}>
                <SimpleAudioPlayer audioSrc={value?.audioSrc ?? ''} />
              </Box>
            </Box>
          )}
        </List>
      </Container>
    </>
  );
};

export default P08;
