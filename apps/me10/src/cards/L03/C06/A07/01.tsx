import { IHE01602Info } from '@maidt-cntn/pages/HE-016-02';
import { IAudioPlayerProps, Typography, TMainHeaderInfoTypes, BoxWrap, Box, PinchZoom, Scroll, Image } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'We Have a Cat on Our Team! (4)',
    headerPattern: 'text',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C06/A07/ME1-L03-C06-A07-P01.mp3',
    captionSrc: '/L03/C06/A07/ME1-L03-C06-A07-P01.srt',
  };

  const text = (
    <>
      <Typography style={{ textIndent: 'var(--font-size-28)' }}>
        Then, Cathy jumped into the air and got the ball. She quickly passed it over.
      </Typography>
      <Typography style={{ textIndent: 'var(--font-size-28)' }}>“Wow, Cathy! How did you do that?” The dogs were surprised.</Typography>
    </>
  );

  const info: IHE01602Info = {
    altText: '고양이가 높이 점프를 해 공을 차고 있는 모습. 그 모습을 본 강아지들은 놀라워 하고 있다.',
    text: text,
    imageSrc: '/L03/C06/A07/ME1-L03-C06-A07-P01.jpg',
  };

  return (
    <Container headerInfo={headerInfo} audioInfo={audioInfo}>
      <BoxWrap useFull>
        <Box width='400px' vAlign='center' useFull>
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
