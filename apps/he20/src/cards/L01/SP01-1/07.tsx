import { Box, BoxWrap, List, SimpleAudioPlayer, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P07 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 주요 내용 이해하기',
    headerPattern: 'text',
  };

  const questionInfo = {
    text: (
      <Box>
        <Typography weight={'var(--font-weight-extraBold)'}>▪ 의도 표현하기</Typography>
        <Box>
          <Typography color='var(--color-blue-700)'>
            <Typography useGap={false} weight={'var(--font-weight-extraBold)'}>
              &nbsp;I'm thinking of~&nbsp;
            </Typography>
            를 사용하여 의도를 표현할 수 있다.
          </Typography>
        </Box>
      </Box>
    ),
  };

  const data = [
    {
      content: (
        <>
          <Box>
            <Typography>
              <Typography useGap={false} weight={'var(--font-weight-extraBold)'}>
                &nbsp;I'm thinking of&nbsp;
              </Typography>
              picking up trash in the park.
            </Typography>
          </Box>
          <Box>
            <Typography>&nbsp;나는 공원에서 쓰레기를 주우려고 해.</Typography>
          </Box>
        </>
      ),
      audioSrc: '/L01/SP01-1/HE2-L01-SP01-1-P07-01.mp3',
    },
    {
      content: (
        <>
          <Box>
            <Typography>
              <Typography useGap={false} weight={'var(--font-weight-extraBold)'}>
                &nbsp;I'm thinking of&nbsp;
              </Typography>
              teaching English to children.
            </Typography>
          </Box>
          <Box>
            <Typography>&nbsp;나는 아이들에게 영어를 가르치려고 해.</Typography>
          </Box>
        </>
      ),
      audioSrc: '/L01/SP01-1/HE2-L01-SP01-1-P07-02.mp3',
    },
  ];

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} submitLabel='완료하기'>
      <List data={data}>
        {({ value, index = 1 }) => (
          <BoxWrap height={'120px'}>
            <Box useFull height={'30px'} display={'flex'}>
              <div>{value?.content}</div>
            </Box>
            <Box hAlign='flex-end' gap='6px'>
              <SimpleAudioPlayer audioSrc={value?.audioSrc ?? ''} />
            </Box>
          </BoxWrap>
        )}
      </List>
    </Container>
  );
};

export default P07;
