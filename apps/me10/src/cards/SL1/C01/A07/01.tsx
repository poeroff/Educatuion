import HE01602, { IHE01602Info } from '@maidt-cntn/pages/HE-016-02';
import { Box, IAudioPlayerProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'The World of Picasso (4)',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/SL1/C01/A07/ME1-SL1-C01-A07-P01.mp3',
    captionSrc: '/SL1/C01/A07/ME1-SL1-C01-A07-P01.mp3',
    top: -10,
  };

  const info: IHE01602Info = {
    altText: '자신이 좋아하는 스타일의 줄무늬 바지를 입고 그림을 그리는 노인 피카소',
    text: (
      <>
        <Box lineHeight={'48px'}>
          &nbsp;&nbsp;&nbsp;&nbsp;Picasso saw things differently. Even his fashion style was different. He wanted to buy this style of trousers, but
          he couldn’t find any. Everyone said, “When you wear them, you look short and fat.” So he had to make a special order.
        </Box>
        <Box lineHeight={'48px'}>
          &nbsp;&nbsp;&nbsp;&nbsp;Picasso died at the age of 91, and until then he never stopped trying new things. He showed us the world in a
          special way.
        </Box>
      </>
    ),
    imageSrc: '/SL1/C01/A03/ME1-SL1-C01-A03-5.jpg',
  };

  return <HE01602 headerInfo={headerInfo} audioInfo={audioInfo} info={info} />;
};
export default P01;
