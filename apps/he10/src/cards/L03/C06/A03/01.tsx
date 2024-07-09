import HE01602, { IHE01602Info } from '@maidt-cntn/pages/HE-016-02';
import { TMainHeaderInfoTypes, IAudioPlayerProps, Typography } from '@maidt-cntn/ui';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Tuning Out: The Science of Noise-Cancellation (1)',
    headerPattern: 'text',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C06/A03/HE1-L03-C06-A03-P01.mp3',
    captionSrc: '/L03/C06/A03/HE1-L03-C06-A03-P01.srt',
  };

  const data: IHE01602Info = {
    text: (
      <Typography useGap={false}>
        Which is the better environment for studying: a noisy place or a quiet place? Rarely do people want to put up with a lot of noise because it
        can be unpleasant and distracting. Fortunately, scientists have invented noise-cancelling technology, which is now being used across various
        fields to reduce unwanted noise. What is the scientific principle behind this achievement? To understand this, let’s examine how sound
        travels.
      </Typography>
    ),
    imageSrc: '/L03/C06/A03/HE1-L03-C06-A03-P01.jpg',
    altText: '비행기에 앉아있는 사람이 노이즈 캔슬링 헤드폰을 끼고 핸드폰을 보며 웃고 있다.',
    imageWidth: '346px',
  };

  return <HE01602 headerInfo={headerInfo} audioInfo={audioInfo} info={data} />;
};

export default P01;
