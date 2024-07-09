import { Box, BoxWrap, IAudioPlayerProps, Image, PinchZoom, Scroll, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { contentInfo } from './contentInfo';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'From Shadows to Spotlights (2)',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C06/A04/HE2-L03-C06-A04-P01.mp3',
    captionSrc: '/L03/C06/A04/HE2-L03-C06-A04-P01.srt',
  };

  const udl = [
    `갤러리 벽에 전시되어 있는 Bill Traylor의 그림 세 점`,
    `제목 Mean Dog`,
    `으르렁거리고 있는 개의 그림`,
    `제목 Man and Large Dog`,
    `개를 산책시키고 있는 모자를 쓴 사람의 그림`,
    `제목 Woman with Purse and Man with Umbrella`,
    `지갑을 들고 있는 여성과 우산을 들고 있는 남성의 그림`,
  ];

  return (
    <Container headerInfo={headerInfo} audioInfo={audioInfo}>
      <BoxWrap useFull>
        <Box width='346px' vAlign='center' useFull>
          <PinchZoom>
            <Image src={'/L03/C06/A04/HE2-L03-C06-A04-P01.jpg'} width='346px' height='200px' alt='' ariaDescribedby='img_desc' />
            {udl && (
              <Box type='hidden' id='img_desc'>
                {udl.map((item, index) => (
                  <p key={`img_desc_${index}`}>{item}</p>
                ))}
              </Box>
            )}
          </PinchZoom>
        </Box>
        <Box useFull background='white' useRound>
          <Scroll height='100%'>
            <Typography>
              &nbsp;&nbsp;
              {contentInfo.map(content => {
                return content.originText;
              })}
            </Typography>
          </Scroll>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P01;
