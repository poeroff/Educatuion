import HE01603, { IHE01603Info } from '@maidt-cntn/pages/HE-016-03';
import { IAudioPlayerProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { contentInfo } from './contentInfo';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: `Then and Now (2)`,
  };
  const audioInfo: IAudioPlayerProps = {
    audioSrc: contentInfo.P01.audio.src,
    captionSrc: contentInfo.P01.audio.caption,
  };
  const HE01603Info: IHE01603Info[] = [
    {
      id: 'P1',
      udl: contentInfo.P01.image.alt[0],
      text: [contentInfo.P01.body[0]],
      imageSrc: [contentInfo.P01.image.src[0]],
      imagePosition: 'after',
    },
    {
      id: 'P2',
      udl: contentInfo.P01.image.alt[1],
      text: [contentInfo.P01.body[1]],
      imageSrc: [contentInfo.P01.image.src[1]],
      imagePosition: 'after',
    },
  ];
  return <HE01603 headerInfo={headerInfo} audioInfo={audioInfo} title='' info={HE01603Info} />;
};

export default P01;
