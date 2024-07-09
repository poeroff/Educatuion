import { Box, TMainHeaderInfoTypes, PinchZoom, Image, EImageType, IAudioPlayerProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Think and Talk',
  };
  const questionInfo = {
    text: 'Think of a situation where you would like to use noise-cancellation technology. Check out the example.',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C07/A04/HE1-L03-C07-A04-P01.mp3',
    captionSrc: '/L03/C07/A04/HE1-L03-C07-A04-P01.srt',
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo}>
      <Box marginTop='20px' alignContent='center' tabIndex={101}>
        <PinchZoom>
          <Image
            src={'/L03/C07/A04/HE1-L03-C07-A04-P01.jpg'}
            alt=''
            height='340px'
            style={{ objectFit: 'contain' }}
            type={EImageType.IMG}
            ariaDescribedby='img_desc'
          />
          <Box type='hidden' id='img_desc'>
            '베개로 귀를 틀어 막으면서 찡그리는 표정의 여자 말풍선 속 글자 : I wish someone would develop a noise cancelling pillow! I can’t sleep
            well at night because of the noise from outside. 말풍선 속 글자 I wish ... I can’t ...'
          </Box>
        </PinchZoom>
      </Box>
    </Container>
  );
};

export default P01;
