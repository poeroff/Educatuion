import { Container } from '@maidt-cntn/ui/en';
import { Box, TMainHeaderInfoTypes, Image, Typography, IQuestionProps, IAudioPlayerProps, BoxWrap, PinchZoom, List, Label } from '@maidt-cntn/ui';

interface IListenAndAnswer {
  content: React.ReactNode;
}

const ME11401 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Talk to Play: Find a Person',
  };

  const questionInfo: IQuestionProps = {
    text: '어떻게 말하면 좋을지 확인해 봅시다.',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: 'audioSrc',
  };

  const data: IListenAndAnswer[] = [
    {
      content: (
        <>
          Hi, I'm&nbsp;
          <Typography textDecoration='underline' useGap={false}>
            Hajin.
          </Typography>
          &nbsp; Nice to meet you.
        </>
      ),
    },
    {
      content: (
        <>
          I'm&nbsp;
          <Typography textDecoration='underline' useGap={false}>
            Yuna.
          </Typography>
          &nbsp; Nice to meet you, too.
        </>
      ),
    },
    {
      content: (
        <>
          <Typography textDecoration='underline' useGap={false}>
            Yuna
          </Typography>
          , do you like&nbsp;
          <Typography textDecoration='underline' useGap={false}>
            mint chocolate
          </Typography>
          ?
        </>
      ),
    },
    {
      content: <>Yes, I do! / No, I don’t!</>,
    },
  ];

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} vAlign='center'>
      <BoxWrap>
        <Box>
          <PinchZoom>
            <Image src={'/example/ME-114-01.png'} width='387px' alt='민트 초콜릿, 야구, 영어, 개, 떡볶이, 새, 점심 급식, 교복, 비 오는 날' />
          </PinchZoom>
        </Box>
        <Box>
          <List<IListenAndAnswer>
            data={data}
            row={({ value, index }) => {
              const isEven = index && index % 2;

              return (
                <Box vAlign='center' key={index}>
                  <Box padding='6px 11px'>
                    <Label type={'paint'} value={isEven ? 'A' : 'B'} background={isEven ? 'var(--color-blue-100)' : 'var(--color-yellow-100)'} />
                  </Box>
                  <Typography>{value?.content}</Typography>
                </Box>
              );
            }}
          />
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default ME11401;
