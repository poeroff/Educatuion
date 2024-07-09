import styled from '@emotion/styled';
import { Box, BoxWrap, IAudioPlayerProps, PinchZoom, Scroll, TMainHeaderInfoTypes, Image, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Tuning Out: The Science of Noise-Cancellation (2)',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C06/A04/HE1-L03-C06-A04-P01.mp3',
    captionSrc: '/L03/C06/A04/HE1-L03-C06-A04-P01.srt',
    right: 10,
    top: -10,
  };
  const subheading = 'The Principle of Sound Waves and Interference';

  const script = `Sound is produced through vibrations that occur from a sound source, when the strings of a guitar are played, for instance. The
  vibrations of the sound source cause the air to vibrate and the sound to travel as waves, similar to the ripples created in a lake when
  you throw a stone. When these sound waves reach our ears, the brain interprets them as sound. Just as different ripples in water might
  overlap if you throw two stones, sound waves can also interfere with each other when they meet. There are two types of interference:
  constructive and destructive. Constructive interference occurs when the peaks of two waves overlap, resulting in a bigger wave and a
  louder sound. Destructive interference, on the other hand, occurs when a peak of one wave overlaps with a valley of another wave, so
  they cancel each other out and produce a quieter sound, or no sound at all.`;

  return (
    <Container headerInfo={headerInfo} audioInfo={audioInfo}>
      <BoxWrap useFull>
        <BoxWrap flexDirection='column' flex='1' boxGap={0}>
          <Box width='346px' vAlign='end' useFull>
            <PinchZoom>
              <Image
                src={'/L03/C06/A04/HE1-L03-C06-A04-P01-01.jpg'}
                width='346px'
                alt='음원에서 사람의 귀까지 소리가 전달되는 과정을 표현하는 그림과 글자, Sound Source, Air Vibrations, Sound Waves'
              />
            </PinchZoom>
          </Box>
          <Box width='346px' vAlign='center' useFull>
            <PinchZoom>
              <Image
                src={'/L03/C06/A04/HE1-L03-C06-A04-P01-02.jpg'}
                width='346px'
                alt='Constructive Interference와 Destructive Interference가 각각 어떻게 작용하는지를 설명해주는 그래프'
              />
              <HiddenDiv>
                <dl>
                  <dt>Constructive Interference</dt>
                  <dd>Wave 1 지점과 Peak 지점이 물결 그래프로 이어져 있다</dd>
                  <dd>Wave 2 지점과 Peak 지점이 물결 그래프로 이어져 있다</dd>
                  <dd>두 개의 그래프가 합쳐진 물결 그래프</dd>
                </dl>
              </HiddenDiv>
              <HiddenDiv>
                <dl>
                  <dt>Destructive Interference</dt>
                  <dd>Wave 1 지점과 Peak 지점이 물결 그래프로 이어져 있다</dd>
                  <dd>Wave 2 지점과 valley 지점이 물결 그래프로 이어져 있다</dd>
                  <dd>두 개의 그래프가 합쳐진 그래프는 물결이 없다.</dd>
                </dl>
              </HiddenDiv>
            </PinchZoom>
          </Box>
        </BoxWrap>
        <BoxWrap flexDirection='column'>
          <Box useFull marginBottom={12} padding={'4px 0px'}>
            <Typography style={{ fontSize: 'var(--font-size-32)', lineHeight: '48px' }} align='center' weight={'var(--font-weight-bold)'}>
              {subheading}
            </Typography>
          </Box>
          <Box background='white' useRound maxHeight={'calc(100% - 114px)'} padding={'16px 4px'}>
            <Scroll tabIndex={0}>
              <Typography style={{ textIndent: 'var(--font-size-28)' }}>{script}</Typography>
            </Scroll>
          </Box>
        </BoxWrap>
      </BoxWrap>
    </Container>
  );
};

export default P01;

const HiddenDiv = styled.div`
  overflow: hidden;
  position: absolute;
  z-index: -1;
  width: 1px;
  height: 1px;
  font-size: 1px;
  opacity: 0.01;
  clip: rect(1px, 1px, 1px, 1px);
`;
