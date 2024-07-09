import { TMainHeaderInfoTypes, IAudioPlayerProps, Typography } from '@maidt-cntn/ui';
import HE01602, { IHE01602Info } from '@maidt-cntn/pages/HE-016-02';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'A Better Future for Coffee Waste (2)',
    headerPattern: 'text',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C06/A04/HE1-L04-C06-A04-P01.mp3',
    captionSrc: '/L04/C06/A04/HE1-L04-C06-A04-P01.srt',
  };

  const text = (
    <Typography useGap={false}>
      {`The world’s widespread love of coffee comes at a substantial environmental cost, as the extraction process generates significant waste. Only 0.2 percent of a coffee bean is used to make coffee, with the remaining 99.8 percent disposed of as waste. As a result, the vast quantity of coffee consumed worldwide produces millions of tons of coffee waste each year.`}
    </Typography>
  );

  const info: IHE01602Info = {
    altText:
      '커피머신에서 커피를 내리는 이미지 위로 커피 콩에서 나오는 쓰레기를 설명하는 슬라이드가 위치해 있다. How Much of a coffee bean is used to make coffee? 0.2% 99.8%',
    text: text,
    imageSrc: '/L04/C06/A04/HE1-L04-C06-A04-P01.JPG',
    imageWidth: '346px',
    imageHeight: '200px',
  };

  return <HE01602 headerInfo={headerInfo} audioInfo={audioInfo} info={info} />;
};

export default P01;
