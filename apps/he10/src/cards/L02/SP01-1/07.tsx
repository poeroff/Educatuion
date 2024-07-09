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
        <Typography weight={'var(--font-weight-extraBold)'}>▪ 관심 표현하기</Typography>
        <Box>
          <Typography color='var(--color-blue-700)'>
            <Typography useGap={false} weight={'var(--font-weight-extraBold)'}>
              &nbsp;I'm interested in~&nbsp;
            </Typography>
            를 사용하여 관심을 표현할 수 있다.
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
                &nbsp;I'm interested in&nbsp;
              </Typography>
              biographies.
            </Typography>
          </Box>
          <Box>
            <Typography>&nbsp;나는 위인전에 관심이 있어.</Typography>
          </Box>
        </>
      ),
      audioSrc: '/L02/SP01-1/HE1-L02-SP01-1-P07-01.mp3',
    },
    {
      content: (
        <>
          <Box>
            <Typography>
              <Typography useGap={false} weight={'var(--font-weight-extraBold)'}>
                &nbsp;I'm interested in&nbsp;
              </Typography>
              comic books.
            </Typography>
          </Box>
          <Box>
            <Typography>&nbsp;나는 만화책에 관심이 있어.</Typography>
          </Box>
        </>
      ),
      audioSrc: '/L02/SP01-1/HE1-L02-SP01-1-P07-02.mp3',
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
