import { Image, BoxWrap, Box, TMainHeaderInfoTypes, List, Label, IAudioPlayerProps, Typography, PinchZoom } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

interface IListenAndAnswer {
  type: string;
  content: React.ReactNode;
  color: string;
}

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Bingo',
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
      content: <Typography useGap={false}>What are you interested in?</Typography>,
    },
    {
      type: 'B',
      color: 'var(--color-orange-200)',
      content: (
        <Typography useGap={false}>
          I’m interested in&nbsp;
          <Typography useGap={false} textDecoration={'underline'}>
            music.
          </Typography>
        </Typography>
      ),
    },
    {
      type: 'A',
      color: 'var(--color-blue-100)',
      content: <Typography useGap={false}>What do you want to be?</Typography>,
    },
    {
      type: 'B',
      color: 'var(--color-orange-200)',
      content: (
        <Typography useGap={false}>
          I want to be a&nbsp;
          <Typography useGap={false} textDecoration={'underline'}>
            singer.
          </Typography>
        </Typography>
      ),
    },
  ];

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L06/C03/A02/ME1-L06-C03-A02-P02.mp3',
    captionSrc: '/L06/C03/A02/ME1-L06-C03-A02-P02.srt',
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo}>
      <BoxWrap useFull>
        <Box width='410px' hAlign={'center'} useFull>
          <PinchZoom>
            <Image
              src={'/L06/C03/A02/ME1-L06-C03-A02-P01.jpg'}
              width='410px'
              height='400px'
              alt='나의 관심사(노란색 칸)과 나의 장래희망(연두색 칸)을 적을 수 있도록 가로 4칸, 세로 4칸씩 16칸으로 구성된 빙고판'
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
