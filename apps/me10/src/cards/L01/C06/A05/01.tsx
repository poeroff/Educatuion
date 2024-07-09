import HE01602, { IHE01602Info } from '@maidt-cntn/pages/HE-016-02';
import { IAudioPlayerProps, Typography, TMainHeaderInfoTypes, BoxWrap, Box, PinchZoom, Scroll, Image } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'What’s in Your School Survival Kit? (2)',
    headerPattern: 'text',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C06/A05/ME1-L01-C06-A05-P01.mp3',
    captionSrc: '/L01/C06/A05/ME1-L01-C06-A05-P01.srt',
    top: -10,
  };

  const text = (
    <Typography>
      &nbsp;&nbsp; This box is my school survival kit. I have many things in it. First, I have some sticky notes. I use them on the first day. I write
      your names and remember them. Next, I have some candies. These are for you. They’re sweet, like your smiles.
    </Typography>
  );

  const info: IHE01602Info = {
    altText: '반쯤 열려 있는 상자 안에 사탕들이 들어 있다. 여자 선생님은 상자 옆에 서서 손짓으로 설명을 하고 있다.',
    text: text,
    imageSrc: '/L01/C06/A03/ME1-L01-C06-A03-P01-02.jpg',
  };

  return (
    <Container headerInfo={headerInfo} audioInfo={audioInfo}>
      <BoxWrap useFull>
        <Box width='346px' vAlign='center' useFull>
          <PinchZoom>
            <Image
              src={info.imageSrc}
              width={info?.imageWidth || '100%'}
              height={info?.imageHeight || '100%'}
              alt={info.altText}
              ariaDescribedby={info.hiddenAltText ? 'img_desc' : undefined}
            />
          </PinchZoom>
          {info.hiddenAltText && (
            <Box type='hidden' id={'img_desc'}>
              {info.hiddenAltText}
            </Box>
          )}
        </Box>
        <Box marginLeft='10px' useFull hAlign='center'>
          <Box background='white' useRound>
            <Scroll height='100%' tabIndex={0}>
              {info.text}
            </Scroll>
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P01;
