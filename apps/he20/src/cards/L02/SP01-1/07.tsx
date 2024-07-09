import { TMainHeaderInfoTypes, Typography, List, Box, SimpleAudioPlayer, IQuestionProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

interface IListen {
  id: number;
  content: React.ReactNode;
  audioSrc: string;
}

const P07 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 주요 내용 이해하기',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: (
      <Box vAlign={'start'} flexDirection={'column'}>
        <Typography weight={700} fontSize={'32px'}>
          ▪ 비교하기
        </Typography>
        <Typography color={'var(--color-blue-900)'}>비교 표현을 사용하여 여러 대상을 비교할 수 있다. </Typography>
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
              I think print books are{' '}
              <Typography useGap={false} weight={'var(--font-weight-bold)'}>
                better than
              </Typography>{' '}
              e-books
            </Typography>
          </Box>
          <Typography>나는 종이책이 전자책보다 더 좋다고 생각해.</Typography>
        </Box>
      ),
      audioSrc: '/L02/SP01-1/HE2-L02-SP01-1-P07-01.mp3',
    },
    {
      id: 2,
      content: (
        <Box>
          <Box vAlign='center'>
            <Typography useGap={false}>
              They look good, but I think cotton is{' '}
              <Typography useGap={false} weight={'var(--font-weight-bold)'}>
                more comfortable than
              </Typography>{' '}
              wool.
            </Typography>
          </Box>
          <Typography>그것들은 좋아 보이지만, 저는 양모보다는 면이 더 편한 것 같아요.</Typography>
        </Box>
      ),
      audioSrc: '/L02/SP01-1/HE2-L02-SP01-1-P07-02.mp3',
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

export default P07;
