import HE01602, { IHE01602Info } from '@maidt-cntn/pages/HE-016-02';
import { Box, IAudioPlayerProps, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { contentInfo } from './contentInfo';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: `We Have a Cat on Our Team! (2)`,
  };
  const audioInfo: IAudioPlayerProps = {
    audioSrc: contentInfo.P01.audio.src,
    captionSrc: contentInfo.P01.audio.caption,
  };
  const HE01602Info: IHE01602Info = {
    hiddenAltText: contentInfo.P01.image.alt.map((altItem, altIndex) => <p key={altIndex}>{altItem}</p>),
    text: (
      <>
        <Box>
          <Typography lineHeight={'48px'}>&nbsp;&nbsp;{contentInfo.P01.body[0]}</Typography>
        </Box>
      </>
    ),
    imageSrc: contentInfo.P01.image.src[0],
    altText: ``,
  };
  return <HE01602 headerInfo={headerInfo} audioInfo={audioInfo} info={HE01602Info} />;
};

export default P01;
