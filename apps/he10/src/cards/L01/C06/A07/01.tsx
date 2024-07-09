import { Scroll, Typography, Box, TMainHeaderInfoTypes, PinchZoom, Image } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'The Power of Friendliness: Soft but Strong (5)',
  };

  const audioInfo = {
    audioSrc: '/L01/C06/A07/HE1-L01-C06-A07.mp3',
    captionSrc: '/L01/C06/A07/HE1-L01-C06-A07.srt',
  };

  const indent = '\u00A0'.repeat(3);

  return (
    <Container headerInfo={headerInfo} audioInfo={audioInfo}>
      <Box background='white' useRound useFull height={'450px'}>
        <Scroll tabIndex={0}>
          <Box vAlign='center' hAlign='center'>
            <PinchZoom pinchType={'image'}>
              <Image
                src={'/L01/C06/A07/HE1-L01-C06-A07.jpg'}
                width='320px'
                height='100%'
                alt={'학교 캠퍼스 잔디 위에 나란히 서서 밝게 웃고 있는 일곱명의 학생들'}
              />
            </PinchZoom>
          </Box>
          <Box marginTop={'8px'}>
            <Typography>
              {indent}In our competitive society, many people believe that only the biggest or the strongest can survive and thrive. However, I
              propose an alternative view: kindness is the key to success. Isn’t that a comforting thought? We can use the power of our natural
              kindness to communicate and cooperate with different individuals. We can all benefit from this instead of trying to be better than
              others. I’d like to end this talk with a message. Think of our society as a bouquet. Just as each flower adds to the beauty when it
              harmonizes with the others, each person can contribute to a more beautiful world when they cooperate. By being kind and working
              together, we can truly flourish. Thank you for your attention.
            </Typography>
          </Box>
        </Scroll>
      </Box>
    </Container>
  );
};

export default P01;
