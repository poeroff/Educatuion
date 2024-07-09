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
        <Typography weight={'var(--font-weight-extraBold)'}>▪ 당부하기</Typography>
        <Box>
          <Typography color='var(--color-blue-700)'>
            <Typography useGap={false} weight={'var(--font-weight-extraBold)'}>
              &nbsp;make sure to~&nbsp;
            </Typography>
            를 사용하여 당부하는 말을 표현할 수 있다.
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
                Make sure not to
              </Typography>
              &nbsp;point with your index finger.
            </Typography>
          </Box>
          <Box>
            <Typography>&nbsp;두 번째 손가락으로 뭔가를 가리키지 않도록 해.</Typography>
          </Box>
        </>
      ),
      audioSrc: '/L02/SP01-1/HE1-L02-SP01-1-P08-01.mp3',
    },
    {
      content: (
        <>
          <Box>
            <Typography>
              I'd like to ask people to
              <Typography useGap={false} weight={'var(--font-weight-extraBold)'}>
                &nbsp;make sure to&nbsp;
              </Typography>
              respect other cultures
            </Typography>
            <Typography>as well as their own.</Typography>
          </Box>
          <Box>
            <Typography>&nbsp;저는 사람들에게 그들의 문화뿐만 아니라 다른 문화들도 존중해 달라고 부탁하고 싶습니다.</Typography>
          </Box>
        </>
      ),
      audioSrc: '/L02/SP01-1/HE1-L02-SP01-1-P08-02.mp3',
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
