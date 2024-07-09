import HE01602, { IHE01602Info } from '@maidt-cntn/pages/HE-016-02';
import { IAudioPlayerProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { L02C06A07Content } from '.';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Light Up Dark Patterns (5)',
    headerPattern: 'text',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C06/A07/HE2-L02-C06-A07-P01.mp3',
    captionSrc: '/L02/C06/A07/HE2-L02-C06-A07-P01.srt',
  };

  const data: IHE01602Info = {
    text: <L02C06A07Content />,
    imageSrc: '/L02/C06/A07/HE2-L02-C06-A07-P01.jpg',
    altText: '책상에 앉아 회의를 하고 있는 네 명의 사람들. 책상 위에는 커피 네 잔과 테블릿, 수첩 등이 올라가 있다.',
    imageWidth: '346px',
  };

  return <HE01602 headerInfo={headerInfo} audioInfo={audioInfo} info={data} />;
};

export default P01;
