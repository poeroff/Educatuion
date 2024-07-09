import { Scroll, Typography, Box, TMainHeaderInfoTypes, PinchZoom, Image, IAudioPlayerProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: `The Power of Friendliness: Soft but Strong (전체 읽기)`,
  };
  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C06/A02/HE1-L01-C06-A02.mp3',
    captionSrc: '/L01/C06/A02/HE1-L01-C06-A02.srt',
  };

  const altText = `학교 복도에서 파란 셔츠를 입은 남자 선생님과 책가방을 맨 긴 파마머리 여학생이 걸어가며 이야기를 나누고 있다.`;

  const text = `It’s good to see you, everyone! I’m Dr. Edward Wilson, an evolutionary biologist. Thank you for inviting me here today. On my way, I had
  trouble locating this room. Luckily, a friendly student came up to me and walked me here. It’s fascinating how, in situations like this,
  we want to help someone in need. Now, this raises some interesting questions: where does our friendliness come from, and why is it
  important?`;

  return (
    <Container headerInfo={headerInfo} audioInfo={audioInfo}>
      <Box background='white' useRound useFull>
        <Scroll height='100%' tabIndex={0}>
          <Typography useGap={false}>{text}</Typography>
          <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'center' }}>
            <PinchZoom pinchType={'image'}>
              <Image alt={altText} src={'/L01/C06/A03/HE1-L01-C06-A03.jpg'} width='480px' />
            </PinchZoom>
          </div>
        </Scroll>
      </Box>
    </Container>
  );
};

export default P02;
