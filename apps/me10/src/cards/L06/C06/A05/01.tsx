import HE01602, { IHE01602Info } from '@maidt-cntn/pages/HE-016-02';
import { IAudioPlayerProps, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { contentInfo } from './contentInfo';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: `Who Do I Want to Be? (2)`,
  };
  const audioInfo: IAudioPlayerProps = {
    audioSrc: contentInfo.P01.audio.src,
    captionSrc: contentInfo.P01.audio.caption,
  };
  const HE01602Info: IHE01602Info = {
    hiddenAltText: contentInfo.P01.image.alt.map((altItem, altIndex) => <p key={altIndex}>{altItem}</p>),
    text: (
      <>
        {contentInfo.P01.body.map((bodyItem, bodyIndex) => (
          <Typography key={bodyIndex} lineHeight={'48px'}>
            {bodyItem}
          </Typography>
        ))}
      </>
    ),
    imageSrc: contentInfo.P01.image.src[0],
    altText: ``,
  };
  return <HE01602 headerInfo={headerInfo} audioInfo={audioInfo} info={HE01602Info} />;
};

export default P01;
