import { Scroll, BoxWrap, Box, TMainHeaderInfoTypes, PinchZoom, Image, IAudioPlayerProps, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'What’s in Your School Survival Kit? (1)',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C06/A04/ME1-L01-C06-A04-P01.mp3',
    captionSrc: '/L01/C06/A04/ME1-L01-C06-A04-P01.srt',
    right: 10,
    top: -10,
  };

  return (
    <Container headerInfo={headerInfo} audioInfo={audioInfo}>
      <BoxWrap useFull alignItems='center'>
        <Box width='346px'>
          <PinchZoom>
            <Image
              src={'/L01/C06/A04/ME1-L01-C06-A04-P01.jpg'}
              width='300px'
              height='390px'
              alt='교실안의 풍경. 학생들이 자리에 앉아 있고 여자 선생님이 교탁 앞에 서서 말하고 있다. 교탁 위에는 상자가 놓여 있다.'
              ariaLabel='교실안의 풍경. 학생들이 자리에 앉아 있고 여자 선생님이 교탁 앞에 서서 말하고 있다. 교탁 위에는 상자가 놓여 있다.'
            />
          </PinchZoom>
        </Box>
        <Box background='white' useRound>
          <Scroll height='100%'>
            <Typography style={{ textIndent: 'var(--font-size-28)' }}>
              Hello, everyone! Welcome to my class! I’m Ms. Seo, your English teacher. Today is the first day of middle school. Are you nervous? I’m
              also nervous, but I feel okay with this box.
            </Typography>
          </Scroll>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P01;
