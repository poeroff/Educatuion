import HE01602, { IHE01602Info } from '@maidt-cntn/pages/HE-016-02';
import { IAudioPlayerProps, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Then and Now (1)',
    headerPattern: 'text',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C06/A04/ME1-L02-C06-A04-P01.mp3',
    captionSrc: '/L02/C06/A04/ME1-L02-C06-A04-P01.srt',
    top: -10,
  };

  const title = ['Then and Now'];
  const text = (
    <Typography style={{ whiteSpace: 'pre-wrap' }}>
      {'   '}
      Meet Jihun and Minjun. They are 12 years old. They both love comics and music, but they live in different times. Jihun lives in 1995, and Minjun
      lives in the present. Let’s look at their lives.
    </Typography>
  );

  const info: IHE01602Info = {
    altText: '',
    hiddenAltText:
      '흑백으로 처리된 1995년의 학생과 컬러로 처리된 현재를 살아가는 학생의 모습. 1995년 학생 주변으로 유선 이어폰, 카세트플레이어, 테이프, 만화책, 동전과 버스표가 말풍선 안에 들어가 있다. 현재를 살아가는 학생의 주변으로는 무선이어폰, 웹툰, AI 스피커, 교통카드가 말풍선 안에 들어가 있다.',
    text: text,
    title: title,
    imageSrc: '/L02/C06/A04/ME1-L02-C06-A04-P01.jpg',
    imageWidth: '320px',
    imageHeight: '300px',
  };

  return <HE01602 headerInfo={headerInfo} audioInfo={audioInfo} info={info} />;
};

export default P01;
