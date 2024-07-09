import { IListenAndAnswer } from '@maidt-cntn/pages/HE-008-01';
import { Box, BoxWrap, Label, List, SimpleAudioPlayer, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P08 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 주요 내용 이해하기',
    headerPattern: 'text',
  };

  const questionInfo = {
    text: (
      <Box>
        <Typography weight={'var(--font-weight-extraBold)'}>▪ 강조 하기</Typography>
        <Box>
          <Typography color='var(--color-blue-700)'>
            <Typography useGap={false} weight={'var(--font-weight-extraBold)'}>
              &nbsp;I think it's important to~&nbsp;
            </Typography>
            를 사용하여 강조를 표현할 수 있다.
          </Typography>
        </Box>
      </Box>
    ),
  };

  const data: IListenAndAnswer[] = [
    {
      content: (
        <>
          <Box>
            <Typography>
              <Typography useGap={false} weight={'var(--font-weight-extraBold)'}>
                I think it's important to
              </Typography>
              &nbsp;take good care of animals in need.
            </Typography>
          </Box>
          <Box>
            <Typography>&nbsp;나는 도움이 필요한 동물을 보살피는 것이 중요하다고 생각해.</Typography>
          </Box>
        </>
      ),
      audioSrc: '/L01/SP01-1/HE2-L01-SP01-1-P08-01.mp3',
    },
    {
      content: (
        <>
          <Box>
            <Typography>
              <Typography useGap={false} weight={'var(--font-weight-extraBold)'}>
                I think it's important to
              </Typography>
              &nbsp;encourage people to protect animals.
            </Typography>
          </Box>
          <Box>
            <Typography>&nbsp;나는 사람들이 동물을 보호하도록 격려하는 것이 중요하다고 생각해.</Typography>
          </Box>
        </>
      ),
      audioSrc: '/L01/SP01-1/HE2-L01-SP01-1-P08-02.mp3',
    },
  ];

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} submitLabel='완료하기'>
      <List data={data}>
        {({ value, index = 1 }) => (
          <BoxWrap height={'120px'}>
            {value?.type && (
              <Box>
                <Label value={value?.type || ''} type={'paint'} background={value?.color} />
              </Box>
            )}
            <Box useFull height={'80px'} display={'flex'}>
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

export default P08;
