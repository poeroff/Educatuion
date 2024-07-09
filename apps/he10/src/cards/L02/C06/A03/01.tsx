import HE01602, { IHE01602Info } from '@maidt-cntn/pages/HE-016-02';
import { IAudioPlayerProps, Typography } from '@maidt-cntn/ui';

const P01 = () => {
  const headerInfo = {
    headerText: 'Gathering of the Whakapapa (1)',
  };
  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C06/A03/HE1-L02-C06-A03-P01.mp3',
    captionSrc: '/L02/C06/A03/HE1-L02-C06-A03-P01.srt',
  };

  const text = (
    <Typography>
      {`The phone rang, and it was my dad calling from my hometown, Waituhi. “Can you take a week off?” he asked. “Your Nani Tama wants you here.” “But Dad!” I answered. “My boss won’t let me take any more time off.” The phone went silent, and then I heard my grandfather say faintly, “I need your help, Grandson. I must go to Murupara to f inish the whakapapa. Drive me there. Hurry, I may not have much time.” I just knew I had no choice. “All right, Nani,” I replied with a sigh. “I’ll  come.”`}
    </Typography>
  );

  const info: IHE01602Info = {
    altText: '휴대폰으로 전화중인 아들 너머로 할아버지가 그 모습을 바라보고 있다.',
    text: text,
    imageSrc: '/L02/C06/A03/HE1-L02-C06-A03-P01.jpg',
    imageWidth: '346px',
    imageHeight: '200px',
  };

  return <HE01602 headerInfo={headerInfo} audioInfo={audioInfo} info={info} />;
};

export default P01;
