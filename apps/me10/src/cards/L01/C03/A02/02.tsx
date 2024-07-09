import { Image, BoxWrap, Box, TMainHeaderInfoTypes, List, Label, IAudioPlayerProps, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

interface IListenAndAnswer {
  type: string;
  content: React.ReactNode;
  color: string;
}

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Find a Person',
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
        <>
          Hi, I’m{' '}
          <Typography useGap={false} textDecoration={'underline'}>
            Hajin
          </Typography>
          . Nice to meet you.
        </>
      ),
    },
    {
      type: 'B',
      color: 'var(--color-orange-200)',
      content: (
        <>
          I’m{' '}
          <Typography useGap={false} textDecoration={'underline'}>
            Yuna
          </Typography>
          . Nice to meet you, too.
        </>
      ),
    },
    {
      type: 'A',
      color: 'var(--color-blue-100)',
      content: (
        <>
          <Typography useGap={false} textDecoration={'underline'}>
            Yuna
          </Typography>
          , do you like{' '}
          <Typography useGap={false} textDecoration={'underline'}>
            mint chocolate
          </Typography>
          ?
        </>
      ),
    },
    {
      type: 'B',
      color: 'var(--color-orange-200)',
      content: 'Yes, I do! \n No, I don’t!',
    },
  ];

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C03/A02/ME1-L01-C03-A02-P02.mp3',
    right: 10,
    top: 10,
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo}>
      <BoxWrap useFull>
        <Box width='410px' hAlign={'center'} useFull>
          <Image
            src={'/L01/C03/A02/ME1-L01-C03-A02-P01.jpg'}
            width='410'
            alt='민트 초콜릿, 야구, 영어, 개, 떡볶이, 새, 점심 급식, 교복, 비 오는 날'
          />
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
