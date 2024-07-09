import {
  Image,
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  List,
  Typography,
  PinchZoom,
  Scroll,
  EStyleFontSizes,
  Label,
  IAudioPlayerProps,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

interface IListenAndAnswer {
  type: string;
  content: React.ReactNode;
  color: string;
}

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'World Food Festival',
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
          Let's try&nbsp;
          <Typography useGap={false} textDecoration={'underline'}>
            Korean food.
          </Typography>
        </Typography>
      ),
    },
    {
      type: 'B',
      color: 'var(--color-orange-200)',
      content: <Typography useGap={false}>Great. I'm so excited! Where is the restaurant?</Typography>,
    },
    {
      type: 'A',
      color: 'var(--color-blue-100)',
      content: (
        <Typography useGap={false} textDecoration={'underline'}>
          We have to go straight two blocks, and turn right. It's on our left.{' '}
        </Typography>
      ),
    },
  ];

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C03/A02/ME1-L04-C03-A02-P02.mp3',
    captionSrc: '/L04/C03/A02/ME1-L04-C03-A02-P02.srt',
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo}>
      <BoxWrap useFull>
        <Box width='410px' hAlign={'center'} flexDirection='column' useFull>
          <PinchZoom>
            <Image
              src={'/L04/C03/A02/ME1-L04-C03-A02-P01.jpg'}
              width='360px'
              height='340px'
              alt='세계 음식 축제를 하는 공원의 지도 음식점 자리마다 번호가 쓰여있다. '
            />
          </PinchZoom>
          <Box width='400px' justifyContent='flex' background='#FFF0CC'>
            <Typography size={EStyleFontSizes['X-SMALL']}>{'(A) Mexican Food'}</Typography>
            <Typography size={EStyleFontSizes['X-SMALL']}>{'Italian Food'}</Typography>
            <Typography size={EStyleFontSizes['X-SMALL']}>{'Chinese Food'}</Typography>
          </Box>
          <Box width='400px' background='#EB6707'>
            <Typography size={EStyleFontSizes['X-SMALL']}>{'(B) American Food'}</Typography>
            <Typography size={EStyleFontSizes['X-SMALL']}>{'Thai Food'}</Typography>
            <Typography size={EStyleFontSizes['X-SMALL']}>{'Indian Food'}</Typography>
          </Box>
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
