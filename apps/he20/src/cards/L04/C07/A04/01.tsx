import { Box, TMainHeaderInfoTypes, Dialog, PinchZoom, Image, EImageType, IAudioPlayerProps, IQuestionProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { useState } from 'react';

const P01 = () => {
  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Think and Talk',
  };

  const questionInfo: IQuestionProps = {
    text: 'Think and talk about how you want to use AI-powered neural implants. Check out the example.',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C07/A04/HE2-L04-C07-A04-P01.mp3',
    captionSrc: '/L04/C07/A04/HE2-L04-C07-A04-P01.srt',
    top: -10,
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo}>
      <Box>
        <Box marginTop='20px'>
          <PinchZoom>
            <Image src={'/L04/C07/A04/HE2-L04-C07-A04-P01.jpg'} width='100%' height='340px' type={EImageType.IMG} />
            <Box type='hidden'>
              <p>흰 가운을 입은 연구원 남녀 두 명이 대화를 나누고 있는 모습</p>
              <p>
                남자 말 풍선 속 글자: If I were a developer of AI-powered neural implants, I would want to apply this technology to treat people’s
                mental health problems.
              </p>
              <p>여자 말 풍선 속 글자 : If I were developing AI-powered neural implants, I would use this technology to ...</p>
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
