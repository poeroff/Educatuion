import { BoxWrap, Box, TMainHeaderInfoTypes, PinchZoom, Image, Scroll, IAudioPlayerProps, Typography, EStyleFontSizes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Volunteering at an Animal Sanctuary(3)',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C06/A05/HE2-L01-C06-A05-P01.mp3',
    captionSrc: '/L01/C06/A05/HE2-L01-C06-A05-P01.srt',
    right: 10,
    top: -10,
  };

  return (
    <Container headerInfo={headerInfo} audioInfo={audioInfo}>
      <BoxWrap useFull>
        <Box width='346px' vAlign='center' useFull>
          <PinchZoom>
            <Image alt='' src={'/L01/C06/A05/HE2-L01-C06-A05-P01.jpg'} width='346px' height='200px' ariaDescribedby='img_desc' />
            <Box type='hidden' id='img_desc'>
              <p>철장에 갇힌 새끼 곰의 사진과 Bears Around the World 라는 제목의 곰의 서식지 지도</p>
              <p>
                Brown Bear, Polar Bear, American Black Bear, Andean Bear, Giant Panda, Asiatic Black Bear, Sloth Bear, Sun Bear의 서식지가 지도 위에
                표시되어 있다.
              </p>
            </Box>
          </PinchZoom>
        </Box>
        <Box>
          <Box hAlign={'center'} flexDirection={'column'}>
            <Typography weight={'bold'} size={EStyleFontSizes.MEDIUM}>
              July 30, Tuesday
            </Typography>
          </Box>
          <Box useFull useRound background='white' height={'400px'}>
            <Scroll height='100%' tabIndex={0}>
              <Box>
                <Typography weight={'normal'} size={EStyleFontSizes.MEDIUM}>
                  Today, we made a gift for Ben and Lily. These two baby bears were rescued after they had been raised illegally in a tiny cage on a
                  farm for many years. To help the bears restore their natural instincts, we carried out some special activities known as “behavioral
                  enrichment.” For example, we made honey-log feeders for the bears. First, we made several holes in a log and filled them with honey.
                  Then, we hung the honey-log feeders on trees near the bears’ habitat. As bears are intelligent and curious creatures, they can
                  become bored and stressed when lacking mental and physical stimulation. The honey-log feeders stimulate their natural curiosity and
                  keep them as active as they would be in the wild. After a while, Ben and Lily approached the feeders and started eating the honey
                  inside. They are so cute!
                </Typography>
              </Box>
            </Scroll>
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P01;
