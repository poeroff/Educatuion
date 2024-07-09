import { BoxWrap, Box, TMainHeaderInfoTypes, PinchZoom, Image, Scroll, IAudioPlayerProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const HE01602 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'The Power of Friendliness: Soft but String (1/5)',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: 'audioSrc',
    right: 10,
    top: -10,
  };

  return (
    <Container headerInfo={headerInfo} audioInfo={audioInfo}>
      <BoxWrap useFull>
        <Box width='346px' vAlign='center' useFull>
          <PinchZoom tabIndex={101}>
            <Image
              src={'/A01/0016/02/P1-IMG-1.png'}
              width='346px'
              height='200px'
              alt='사탕을 보고 있는 여학생, 사탕 3개가 상자 밖에 나와 있는 그림, 상자 밖에 나와 있는 사탕 3개를 보고 있는 여학생'
              title='사탕을 보고 있는 여학생, 사탕 3개가 상자 밖에 나와 있는 그림, 상자 밖에 나와 있는 사탕 3개를 보고 있는 여학생'
            />
          </PinchZoom>
        </Box>
        <Box useFull background='white' useRound>
          <Scroll height='100%'>
            It's good to see you, everyone! I'm Dr.Edward Wilson, an evolutionary biologist. On my way, I had trouble location this room. Luckily, a
            friendly student came up to me and walked me here. It's fascination how, in situations like this, we want to help someone in need. Now,
            this raises some interesting questions: where does our friendliness come from, and why is it important?
          </Scroll>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default HE01602;
