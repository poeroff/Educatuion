import { IAudioPlayerProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import HE01602, { IHE01602Info } from '@maidt-cntn/pages/HE-016-02';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Tuning Out: The Science of Noise-Cancellation (5)',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C06/A07/HE1-L03-C06-A07-P01.mp3',
    captionSrc: '/L03/C06/A07/HE1-L03-C06-A07-P01.srt',
  };

  const info: IHE01602Info = {
    altText: '위층에서 6명의 사람이 축포를 터뜨리며 신나게 파티를 즐기고 있고 아래층의 두 사람이 괴로운 표정을 하며 귀를 막고 있다.',
    imageSrc: '/L03/C06/A07/HE1-L03-C06-A07-P01.jpg',
    text: 'As technology advances, many people expect it will solve various social issues caused by noise pollution. A common source of these problems is noisy neighbors, as the noise they make can lead to conflict among residents. Noise-cancellation technology can help address these problems by reducing unwanted disturbances, allowing people to lead more peaceful and healthier lives.',
    imageWidth: '346px',
    imageHeight: '414px',
  };

  return <HE01602 audioInfo={audioInfo} headerInfo={headerInfo} info={info} />;
};

export default P01;
