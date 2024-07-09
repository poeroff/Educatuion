import { Image, BoxWrap, Box, TMainHeaderInfoTypes, List, Label, IAudioPlayerProps, Typography, PinchZoom } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

interface IListenAndAnswer {
  type: string;
  content: React.ReactNode;
  color: string;
}

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Ladder Game',
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
      content: (
        <Typography useGap={false}>
          I’m going to&nbsp;
          <Typography useGap={false} textDecoration={'underline'}>
            save energy.
          </Typography>
          Do you have any ideas?
        </Typography>
      ),
    },
    {
      type: 'B',
      color: 'var(--color-orange-200)',
      content: (
        <Typography useGap={false}>
          Why don’t you&nbsp;
          <Typography useGap={false} textDecoration={'underline'}>
            use the stairs
          </Typography>
          ?
        </Typography>
      ),
    },
    {
      type: 'A',
      color: 'var(--color-blue-100)',
      content: <Typography useGap={false}>That’s a good idea! Thanks.</Typography>,
    },
  ];

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L05/C03/A02/ME1-L05-C03-A02-P02.mp3',
    captionSrc: '/L05/C03/A02/ME1-L05-C03-A02-P02.srt',
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo}>
      <BoxWrap useFull>
        <Box width='410px' hAlign={'center'} useFull>
          <PinchZoom>
            <Image
              src={'/L05/C03/A02/ME1-L05-C03-A02-P01.jpg'}
              width='410px'
              height='400px'
              alt='다양한 계획과 실천 아이디어가 사다리타기로 연결되어 있다. 
                    save energy – use the stairs
                    made a short video – try a dance challenge
                    do some exercise – play tennis with me
                    have lunch – order tteokbokki
                    do volunteer work – pick up trash in the park'
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
