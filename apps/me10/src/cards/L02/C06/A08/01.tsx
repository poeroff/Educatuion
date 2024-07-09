import { IHE01602Info } from '@maidt-cntn/pages/HE-016-02';
import { IAudioPlayerProps, Typography, TMainHeaderInfoTypes, BoxWrap, Box, PinchZoom, Scroll, Image } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Then and Now (5)',
    headerPattern: 'text',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C06/A08/ME1-L02-C06-A08-P01.mp3',
    captionSrc: '/L02/C06/A08/ME1-L02-C06-A08-P01.srt',
  };

  const text = (
    <Typography style={{ textIndent: 'var(--font-size-28)' }}>
      Minjun is using his tablet and writing a rap song. He shares the song on social media. He gets “likes” from people around the world. Minjun
      checks his DMs before bedtime. One message says, “U R AMAZING!”
    </Typography>
  );

  const info: IHE01602Info = {
    altText: '남자아이가 헤드셋으로 음악을 들으며 sns에 Beat by Min이라는 제목으로 음악을 공유하는 모습.',
    text: text,
    imageSrc: '/L02/C06/A08/ME1-L02-C06-A08-P01.jpg',
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
