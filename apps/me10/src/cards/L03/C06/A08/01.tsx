import { IHE01602Info } from '@maidt-cntn/pages/HE-016-02';
import { IAudioPlayerProps, Typography, TMainHeaderInfoTypes, BoxWrap, Box, PinchZoom, Scroll, Image } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'We Have a Cat on Our Team! (5)',
    headerPattern: 'text',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C06/A08/ME1-L03-C06-A08-P01.mp3',
    captionSrc: '/L03/C06/A08/ME1-L03-C06-A08-P01.srt',
  };

  const text = (
    <Typography style={{ textIndent: 'var(--font-size-28)' }}>
      After the game, everyone talked about Cathy. “We have a cat on our team now. I’m so glad!” said Max. “Great!” Coach Biscuit said, “We have
      another new member.” “A dog or a cat?” Everyone got excited. “Cookie! Please come out.” Coach Biscuit called out to the new member.
    </Typography>
  );

  const info: IHE01602Info = {
    altText: '동물들이 잔디밭에 모여 있다. 빨간색 호루라기를 찬 강아지가 다른 동물들에게 오리 한 마리를 소개하는 모습.',
    text: text,
    imageSrc: '/L03/C06/A08/ME1-L03-C06-A08-P01.jpg',
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
