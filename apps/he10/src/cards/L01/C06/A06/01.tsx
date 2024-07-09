import { Box, IAudioPlayerProps, Image, PinchZoom, Scroll, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'The Power of Friendliness: Soft but Strong (4/5)',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C06/A06/HE1-L01-C06-A06.mp3',
    captionSrc: '/L01/C06/A06/HE1-L01-C06-A06.srt',
    top: -10,
    right: -10,
  };

  return (
    <Container headerInfo={headerInfo} audioInfo={audioInfo} useExtend>
      <Box background='white' useRound useFull>
        <Scroll topHeight={0} height='calc(100%)' tabIndex={0}>
          <Box>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <PinchZoom pinchType={'image'}>
                <Image
                  alt={
                    '왼쪽 네안데르탈인과 오른쪽 호모사피언스의 비교 사진을 설명하는 남자 선생님\n 네안데르탈인과 호모 사피언스 비교 슬라이드 이미지'
                  }
                  title='Neanderthals vs. Homo Sapiens (Case 3)'
                  src={'/L01/C06/A06/HE1-L01-C06-A06.jpg'}
                  width='350px'
                  height='156.77px'
                />
              </PinchZoom>
            </div>
          </Box>
          <Box marginTop={8}>
            <Typography>
              Now let's turn our attention to ourselves, Homo sapiens. How have we managed to survive for so long? Neanderthals existed together with
              Homo sapiens until about 40,000 years ago, and they were known to be intelligent and physically superior to Homo sapiens. Neanderthals
              were able to make tools and fire and had strong bodies with well-developed muscles and broad shoulders. Despite these attributes,
              however, it was Homo sapiens who ultimately survived and thrived. One possible explanation is that our ancestors lived in larger
              communities that promoted cooperation and the free exchange of knowledge, while Neanderthals tended to live in smaller groups. These
              social differences may have given Homo sapiens a competitive advantage over Neanderthals, allowing them to adapt to an ever-changing
              environment.
            </Typography>
          </Box>
        </Scroll>
      </Box>
    </Container>
  );
};

export default P01;
