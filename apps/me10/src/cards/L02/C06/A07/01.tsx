import { IHE01602Info } from '@maidt-cntn/pages/HE-016-02';
import { IAudioPlayerProps, Typography, TMainHeaderInfoTypes, BoxWrap, Box, PinchZoom, Scroll, Image } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Then and Now (4)',
    headerPattern: 'text',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C06/A07/ME1-L02-C06-A07-P01.mp3',
    captionSrc: '/L02/C06/A07/ME1-L02-C06-A07-P01.srt',
  };

  const text = (
    <Typography style={{ textIndent: 'var(--font-size-28)' }}>
      At night, Jihun is listening to his favorite radio show. He records songs from the radio on a tape. There are many great songs on the tape.
      Sometimes, he writes a letter to the DJ and asks for a song.
    </Typography>
  );

  const info: IHE01602Info = {
    altText: '남자아이가 책상에 앉아 라디오로 음악을 들으며 편지를 쓰고 있는 모습. 책상에 테이프가 놓여있다.',
    text: text,
    imageSrc: '/L02/C06/A07/ME1-L02-C06-A07-P01.jpg',
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
