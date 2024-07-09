import { Box, BoxWrap, IAudioPlayerProps, Image, PinchZoom, Scroll, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'The World of Picasso (1)',
    headerPattern: 'text',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/SL1/C01/A04/ME1-SL1-C01-A04-P01.mp3',
    captionSrc: '/SL1/C01/A04/ME1-SL1-C01-A04-P01.srt',
  };

  const text = (
    <Typography style={{ textIndent: 'var(--font-size-28)' }}>
      Pablo Picasso was born in Spain in 1881. His father was an artist, too. But young Picasso could paint better than his father. Picasso painted
      his mother when he was 14 years old. The painting was so good, and it looked real. This time is his{' '}
      <Typography useGap={false} color='var(--color-green-600)' weight='var(--font-weight-bold)' style={{ textIndent: 0 }}>
        Realistic Period
      </Typography>
      .
    </Typography>
  );

  const info = {
    altText: '피카소가 사실적으로 그린 그림을 둔 노란 방 안에 이젤 앞에 앉아 있다.',
    text: text,
    imageSrc: '/SL1/C01/A04/ME1-SL1-C01-A04-P01.jpg',
  };

  return (
    <Container headerInfo={headerInfo} audioInfo={audioInfo}>
      <BoxWrap useFull>
        <Box width='400px' vAlign='center' useFull>
          <PinchZoom>
            <Image src={info.imageSrc} width={'100%'} height={'100%'} alt={info.altText} />
          </PinchZoom>
        </Box>
        <Box marginLeft='10px' useFull hAlign='center'>
          <Box background='white' useRound>
            <Scroll height='100%' tabIndex={0}>
              {info.text}
            </Scroll>
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P01;
