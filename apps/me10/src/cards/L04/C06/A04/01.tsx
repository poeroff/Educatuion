import HE01602, { IHE01602Info } from '@maidt-cntn/pages/HE-016-02';
import { IAudioPlayerProps, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Plan B Was Great, Too! (1)',
    headerPattern: 'text',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C06/A04/ME1-L04-C06-A04-P01.mp3',
    captionSrc: '/L04/C06/A04/ME1-L04-C06-A04-P01.srt',
    top: -10,
  };

  const title = ['Plan B Was Great, Too!'];
  const text = (
    <>
      <Typography style={{ whiteSpace: 'pre-wrap' }}>
        {'   '}
        This Saturday is my grandma’s birthday. Dad and I will visit her in Gunsan. Dad usually makes the plans for family trips, but I will make the
        plan this time!
      </Typography>
      <Typography style={{ whiteSpace: 'pre-line' }} color='var(--color-green-800)' weight='var(--font-weight-bold)'>
        {'\n'}My Plan
      </Typography>
      <Typography style={{ whiteSpace: 'pre-line' }}>
        &nbsp;&nbsp; First, I need bus tickets! I will buy tickets for the first bus from Suwon to Gunsan. The streets will not be busy early in the
        morning.
        {'\n\n   '}&nbsp;&nbsp; Second, I will get a birthday cake! I will buy a strawberry cake at a famous bakery in Gunsan. My grandma loves
        strawberries.
        {'\n\n   '}&nbsp;&nbsp; Third, I will prepare for my grandma’s birthday party! I will find a nice seafood restaurant. Fourth, I will take
        family pictures! Taking family photos in a studio will be great. I’m so excited!
      </Typography>
    </>
  );

  const info: IHE01602Info = {
    altText: '',
    hiddenAltText: '잔디밭에 강아지들이 모여 있다. 빨간색 호루라기를 차고 있는 갈색 강아지 뒤로 고양이 한 마리가 숨어 있는 모습.',
    text: text,
    title: title,
    imageSrc: '/L04/C06/A04/ME1-L04-C06-A04-P01.jpg',
    imageWidth: '320px',
    imageHeight: '300px',
  };

  return <HE01602 headerInfo={headerInfo} audioInfo={audioInfo} info={info} />;
};

export default P01;
