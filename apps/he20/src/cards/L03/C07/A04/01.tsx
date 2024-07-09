import { Box, TMainHeaderInfoTypes, Dialog, PinchZoom, Image, EImageType, IAudioPlayerProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { useState } from 'react';

const P01 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Think and Talk',
  };
  const questionInfo = {
    text: 'Think and talk about how each painter’s artworks made you feel. Check out the example.',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C07/A04/HE2-L03-C07-A04-P01.mp3',
    captionSrc: '/L03/C07/A04/HE2-L03-C07-A04-P01.srt',
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo}>
      <Box hAlign='center'>
        <Box marginTop='20px'>
          <PinchZoom>
            <Image
              src={'/L03/C07/A04/HE2-L03-C07-A04-P01.jpg'}
              alt={''}
              width='696px'
              height='274px'
              ariaDescribedby={'img_desc'}
              type={EImageType.IMG}
            />
            <Box type='hidden' id={'img_desc'}>
              <p>전시회에서 벽에 걸려 있는 작품을 감상하고 있는 사람들.</p>
              <p>남자 말 풍선 속 글자: When I saw Red Sleigh by Maud Lewis, I</p>
              <p>felt a sense of joy and comfort because the bright colors and peaceful scene made me</p>
              <p>think of my childhood memories.</p>
              <p>또 다른 남자 말 풍선 속 글자 :</p>
              <p>When I saw ... by ...,</p>
              <p>I felt ... because ...</p>
            </Box>
          </PinchZoom>
        </Box>
      </Box>

      <Dialog isShow={isShow} useFooter onClose={() => setShow(!isShow)} onConfirm={() => setShow(!isShow)}>
        contents
      </Dialog>
    </Container>
  );
};

export default P01;
