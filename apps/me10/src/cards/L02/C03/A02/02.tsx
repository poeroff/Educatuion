import { Image, BoxWrap, Box, TMainHeaderInfoTypes, List, Label, IAudioPlayerProps, Typography, PinchZoom } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

interface IListenAndAnswer {
  type: string;
  content: React.ReactNode;
  color: string;
}

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Spin! Spin! Spin!',
    headerPattern: 'icon',
    iconType: 'talkToPlay',
  };

  const questionInfo = {
    text: '어떻게 말하면 좋을지 확인해 봅시다.',
  };

  const data: IListenAndAnswer[] = [
    {
      type: 'A',
      color: 'var(--color-blue-100)',
      content: <Typography useGap={false}>How's weather today?</Typography>,
    },
    {
      type: 'B',
      color: 'var(--color-orange-200)',
      content: (
        <Typography useGap={false}>
          It's{' '}
          <Typography useGap={false} textDecoration={'underline'}>
            hot.
          </Typography>
        </Typography>
      ),
    },
    {
      type: 'A',
      color: 'var(--color-blue-100)',
      content: <Typography useGap={false}>I see. What are people doing in this weather?</Typography>,
    },
    {
      type: 'B',
      color: 'var(--color-orange-200)',
      content: (
        <Typography useGap={false}>
          They’re{' '}
          <Typography useGap={false} textDecoration={'underline'}>
            eating ice cream.
          </Typography>
        </Typography>
      ),
    },
  ];

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C03/A02/ME1-L02-C03-A02-P02.mp3',
    captionSrc: '/L02/C03/A02/ME1-L02-C03-A02-P02.srt',
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo}>
      <BoxWrap useFull>
        <Box width='410px' hAlign={'center'} useFull>
          <PinchZoom>
            <Image
              src={'/L02/C03/A02/ME1-L02-C03-A02-P01.jpg'}
              width='410px'
              height='400px'
              alt='10~30점이 쓰여진 다트판 
            10: eat ice cream, buy umbrella 
            20: drink hot chocolate, skate 
            30: surf, ride bikes 
            그 아래에는 hot, snowy, sunny, rainy, windy, cold, cloudy 각 날씨 그림이 있다. '
            />
          </PinchZoom>
        </Box>
        <Box hAlign={'center'} useFull>
          <List<IListenAndAnswer> gap={20} data={data}>
            {({ value, index = 1 }) => (
              <Box hAlign='flex-start'>
                <Box useFull hAlign='flex-start'>
                  <Box marginRight='8px' alignSelf='start'>
                    <Label value={value?.type || ''} type={'paint'} background={value?.color} />
                  </Box>
                  <Typography>{value?.content}</Typography>
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
