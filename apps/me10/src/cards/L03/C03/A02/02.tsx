import { Image, BoxWrap, Box, TMainHeaderInfoTypes, List, Label, IAudioPlayerProps, Typography, PinchZoom } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Roll the Dice',
    headerPattern: 'icon',
    iconType: 'talkToPlay',
  };

  const questionInfo = {
    text: '어떻게 말하면 좋을지 확인해 봅시다.',
  };

  const data = [
    {
      content: (
        <Box background='#F2B75E' useRound>
          <Typography>주황색 칸</Typography>
        </Box>
      ),
    },
    {
      type: 'A',
      color: 'var(--color-blue-100)',
      content: (
        <Typography useGap={false}>
          Can you{' '}
          <Typography useGap={false} textDecoration={'underline'}>
            move this box
          </Typography>
          ?
        </Typography>
      ),
    },
    {
      type: 'B',
      color: 'var(--color-orange-200)',
      content: <Typography useGap={false}>Of course.</Typography>,
    },
    {
      content: (
        <Box background='#B1E6FC' useRound>
          <Typography>하늘색 칸</Typography>
        </Box>
      ),
    },
    {
      type: 'A',
      color: 'var(--color-blue-100)',
      content: <Typography useGap={false}>What's the problem?</Typography>,
    },
    {
      type: 'B',
      color: 'var(--color-orange-200)',
      content: (
        <Typography useGap={false}>
          I&nbsp;
          <Typography useGap={false} textDecoration={'underline'}>
            missed the subway
          </Typography>
          .
        </Typography>
      ),
    },
  ];

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C03/A02/ME1-L03-C03-A02-P02.mp3',
    captionSrc: '/L03/C03/A02/ME1-L03-C03-A02-P02.srt',
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo}>
      <BoxWrap useFull>
        <Box width='410px' hAlign={'center'} useFull>
          <PinchZoom>
            <Image
              src={'/L03/C03/A02/ME1-L03-C03-A02-P01.jpg'}
              width='410px'
              height='400px'
              alt='1~17번까지 있고 각 칸마다 다양한 상황이 쓰여있는 보드게임판'
            />
          </PinchZoom>
        </Box>
        <Box hAlign={'center'} useFull>
          <List gap={20} data={data}>
            {({ value, index = 1 }) => (
              <Box hAlign='flex-start'>
                <Box useFull hAlign='flex-start'>
                  {index === 1 || index === 4 ? (
                    <>{value?.content}</>
                  ) : (
                    <>
                      <Box marginRight='8px' alignSelf='start'>
                        <Label value={value?.type || ''} type={'paint'} background={value?.color} />
                      </Box>
                      <Typography>{value?.content}</Typography>
                    </>
                  )}
                </Box>
              </Box>
            )}
          </List>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P02;
