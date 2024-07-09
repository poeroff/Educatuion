import {
  Box,
  BoxWrap,
  EStyleFontSizes,
  ETextViewColor,
  IAudioPlayerProps,
  Image,
  PinchZoom,
  Scroll,
  TextView,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Will AI-Powered Neural Implants Make Us Super-Humans? (1)',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C06/A03/HE2-L04-C06-A03-P01.mp3',
    captionSrc: '/L04/C06/A03/HE2-L04-C06-A03-P01.srt',
  };

  return (
    <Container headerInfo={headerInfo} audioInfo={audioInfo}>
      <BoxWrap useFull marginTop={'20px'}>
        <Box width='346px' marginTop={'20px'}>
          <PinchZoom>
            <Image
              src={'/L04/C06/A03/HE2-L04-C06-A03-P01.jpg'}
              width='346px'
              height='200px'
              alt='인공지능이 들어있는 사람의 뇌 형상의 사진과 인간의 척추 뼈에 인공지능 칩이 심어져 있는 사진'
            />
          </PinchZoom>
          <Box marginTop={'30px'} width={'346px'}>
            <TextView title={'신경계(Nervous System)'} height={'200px'} type={ETextViewColor.DEFAULT}>
              <Typography useGap={false} size={EStyleFontSizes.SMALL} align={'left'}>
                몸 안팎에서 받은 자극을 받아들여 그에 대한 반응을 생성 · 전달하는 기관으로,크게 중추 신경계(뇌, 척수)와 온몸 곳곳에 퍼져 있는 말초
                신경계로 나뉜다.
              </Typography>
            </TextView>
          </Box>
        </Box>
        <Box useFull background='white' useRound>
          <Scroll height='100%' tabIndex={101}>
            <Typography useGap={false}>
              Neuroscience has a long history of exploring treatments for disorders of the nervous system, including the brain and spinal cord.
              Traditionally, researchers have studied various functions of neural implants, which are medical devices like computer chips that can be
              implanted in the nervous system. But here’s the exciting part: with the rapid advancement of artificial intelligence (AI), researchers
              have begun to integrate AI into neural implants. In this post, we’ll examine the incredible benefits of AI-powered neural implants,
              their amazing potential for the future, and the ethical concerns surrounding them.
            </Typography>
          </Scroll>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P01;
