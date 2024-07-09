import { IHE01602Info } from '@maidt-cntn/pages/HE-016-02';
import { IAudioPlayerProps, Typography, TMainHeaderInfoTypes, BoxWrap, Box, PinchZoom, Scroll, Image } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Small Actions, Big Change (4)',
    headerPattern: 'text',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L05/C06/A07/ME1-L05-C06-A07-P01.mp3',
    captionSrc: '/L05/C06/A07/ME1-L05-C06-A07-P01.srt',
  };

  const text = (
    <>
      <Typography color='var(--color-green-600)' weight='var(--font-weight-bold)'>
        DAY 7 Visit a zero-waste shop.
      </Typography>
      <Typography style={{ textIndent: 'var(--font-size-28)' }}>
        This morning, I ran out of shampoo. I took the empty bottle and went to a zero-waste shop. I filled my bottle with shampoo there. It smelled
        so good! This way, I cut down on plastic.
      </Typography>
    </>
  );

  const info: IHE01602Info = {
    altText: '쓰레기 없는 상점에서 필요한 물건을 다회용기에 담고 있는 여자 아이의 모습. 상점에는 다양한 물건이 플라스틱 통에 진열되어 있다',
    text: text,
    imageSrc: '/L05/C06/A07/ME1-L05-C06-A07-P01.jpg',
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
