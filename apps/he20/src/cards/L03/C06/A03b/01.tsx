import HE01602, { IHE01602Info } from '@maidt-cntn/pages/HE-016-02';
import { IAudioPlayerProps, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'From Shadows to Spotlights (1)',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C06/A03/HE2-L03-C06-A03-P01.mp3',
    captionSrc: '/L03/C06/A03/HE2-L03-C06-A03-P01.srt',
  };

  const text = (
    <Typography>
      {` Welcome to the Dream Art Gallery! I'm Isabel Williams, the docent for the From Shadows to Spotlights exhibit. Today, you're going to meet three amazing artists who never gave up on their art, despite challenges in their lives. Each artist has a unique painting style and story that has made their work highly valued. Let's explore each artist's life and artwork.`}
    </Typography>
  );

  const info: IHE01602Info = {
    altText: '사람들을 바라보며 뭔가를 설명하고 있는 여성과 설명을 듣고 있는 세 명의 사람들의 사진.',
    text: text,
    imageSrc: '/L03/C06/A03/HE2-L03-C06-A03-P01.jpg',
    imageWidth: '346px',
    imageHeight: '200px',
  };

  return <HE01602 headerInfo={headerInfo} audioInfo={audioInfo} info={info} />;
};

export default P01;
