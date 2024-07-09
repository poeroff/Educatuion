import { Box, PinchZoom, VideoPlayer } from '@maidt-cntn/ui';
import { HContainer } from '@maidt-cntn/ui/math';

const HM00301 = () => {
  return (
    <HContainer headerInfo={null} vAlign='flex-start'>
      <Box display='flex' justifyContent='center'>
        <PinchZoom zIndex='99'>
          <VideoPlayer width={832} height={468} videoSrc={''} srtFile={''} />
        </PinchZoom>
      </Box>
    </HContainer>
  );
};

export default HM00301;
