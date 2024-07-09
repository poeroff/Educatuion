import { Box, BoxWrap, IAudioPlayerProps, Image, PinchZoom, Scroll, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { contentInfo } from './contentInfo';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Light Up Dark Patterns (2)',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C06/A04/HE2-L02-C06-A04-P01.mp3',
    captionSrc: '/L02/C06/A04/HE2-L02-C06-A04_P01.srt',
  };

  return (
    <Container headerInfo={headerInfo} audioInfo={audioInfo}>
      <BoxWrap useFull>
        <Box width='346px' vAlign='center' useFull>
          <div>
            <div style={{ marginBottom: '10px' }}>
              <PinchZoom>
                <Image
                  src={'/L02/C06/A04/HE2-L02-C06-A04-P01-01.JPG'}
                  width='346px'
                  height='200px'
                  alt='Last Chance 라고 적힌 노트북 화면 옆에 Limited time offer라는 글이 써있는 알람 시계가 울리고 있는 사진'
                />
              </PinchZoom>
            </div>
            <div>
              <PinchZoom>
                <Image
                  src={'/L02/C06/A04/HE2-L02-C06-A04-P01-02.JPG'}
                  width='346px'
                  height='200px'
                  alt='구독 취소 과정이 그려져 있는 스마트폰 화면'
                />
              </PinchZoom>
            </div>
          </div>
        </Box>

        <Box useFull background='white' useRound>
          <Scroll height='100%'>
            <Typography>
              &nbsp;&nbsp;
              {contentInfo.map((content, idx) => {
                if (idx < 5) return content.originText;
              })}
            </Typography>
            <Typography></Typography>
            <Typography usePre>
              &nbsp;&nbsp;
              {contentInfo.map((content, idx) => {
                if (idx >= 5) return content.originText;
              })}
            </Typography>
          </Scroll>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P01;
