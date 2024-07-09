import { Box, Scroll, BoxWrap, PinchZoom, Image, Typography, IAudioPlayerProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { IHeaderInfo } from './index';

const P01 = ({ headerInfo }: IHeaderInfo) => {
  const contents = `It’s good to see you, everyone! I’m Dr. Edward Wilson, an evolutionary biologist. Thank you for inviting me here today. On my way, I
                  had trouble locating this room. Luckily, a friendly student came up to me and walked me here. It’s fascinating how, in situations
                  like this, we want to help someone in need. Now, this raises some interesting questions: where does our friendliness come from, and
                  why is it important?`;

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C06/A03/HE1-L01-C06-A03.mp3',
  };

  return (
    <Container headerInfo={headerInfo} audioInfo={audioInfo}>
      <BoxWrap useFull height={'450px'}>
        <Box background='white' useRound={true} useFull={true} height={'100%'}>
          <Scroll height={'100%'} tabIndex={0}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <PinchZoom pinchType={'image'}>
                <Image
                  alt={'학교 복도에서 남자 선생님과 책가방을 맨 여학생이 걸어가며 이야기를 나누고 있다.'}
                  src={'/L01/C06/A03/HE1-L01-C06-A03.jpg'}
                  width='320px'
                  height='228.91px'
                />
              </PinchZoom>
            </div>
            <Box paddingTop={'30px'}>
              <Typography weight={500}>{contents}</Typography>
            </Box>
          </Scroll>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P01;
