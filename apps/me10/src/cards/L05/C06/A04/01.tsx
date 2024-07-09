import HE01602, { IHE01602Info } from '@maidt-cntn/pages/HE-016-02';
import { IAudioPlayerProps, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Small Actions, Big Change (1)',
    headerPattern: 'text',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L05/C06/A04/ME1-L05-C06-A04-P01.mp3',
    captionSrc: '/L05/C06/A04/ME1-L05-C06-A04-P01.srt',
    top: -10,
  };

  const title = ['Small Actions, Big Change'];
  const text = (
    <>
      <Typography style={{ whiteSpace: 'pre-wrap' }}>
        {'   '}
        Last month, I saw “#ZeroWasteChallenge” on Jiwoo’s social media. The challenge was making no trash. I liked her idea and tried the challenge.
        Here is my one-week plan for a trash-free life.
      </Typography>
    </>
  );

  const info: IHE01602Info = {
    altText: '',
    hiddenAltText: `(Day1부터 Day7까지 환경보호를 위해 실천해야 할 일들을 그림으로 보여주는 조각 퍼즐)
    DAY 1 know your trash 
    DAY 2 종이가방
    DAY 3 Say No to straws.
    DAY 4 슬픈 표정이 그려진 플라스틱 컵
    DAY 5 Buy and sell secondhand items.
    DAY 6 분리수거 스레기통
    DAY 7 Visit a zero-waste shop.`,
    text: text,
    title: title,
    imageSrc: '/L05/C06/A04/ME1-L05-C06-A04-P01.jpg',
    imageWidth: '320px',
    imageHeight: '228.91px',
  };

  return <HE01602 headerInfo={headerInfo} audioInfo={audioInfo} info={info} />;
};

export default P01;
