import HE01602, { IHE01602Info } from '@maidt-cntn/pages/HE-016-02';
import { TMainHeaderInfoTypes, IAudioPlayerProps } from '@maidt-cntn/ui';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'A Better Future for Coffee Waste (1)',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C06/A03/HE1-L04-C06-A03-P01.mp3',
    captionSrc: '/L04/C06/A03/HE1-L04-C06-A03-P01.srt',
  };

  const text = (
    <>
      The famous German musician Johann Sebastian Bach once said, "Without my morning coffee, I'm just like a dried-up piece of goat." Today this
      sentiment is shared by many, with coffee shops springing up on almost every street corner, and it is common to see city residents walking around
      with a cup of coffee in hand. According to the International Coffee Organization (ICO), approximately 10 billion tons of coffee was consumed
      worldwide between 2020 and 2021, and Koreans made a significant contribution to this huge total, consuming 150,780 tons of coffee. This means
      that every Korean adult drank an average of one cup of coffee every day throughout the year. Clearly, for Koreans and other world citizens,
      coffee is not just a drink but a daily necessity.
    </>
  );

  const info: IHE01602Info = {
    altText: '네 사람이 탁자에 둘러앉아 커피를 마시며 재미있게 이야기를 나누고 있다.',
    text: text,
    imageSrc: '/L04/C06/A03/HE1-L04-C06-A03-01.jpg',
    imageWidth: '346px',
  };

  return <HE01602 headerInfo={headerInfo} audioInfo={audioInfo} info={info} />;
};

export default P01;
