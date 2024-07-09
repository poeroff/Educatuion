import HE01602, { IHE01602Info } from '@maidt-cntn/pages/HE-016-02';
import { IAudioPlayerProps, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'We Have a Cat on Our Team! (1)',
    headerPattern: 'text',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C06/A04/ME1-L03-C06-A04-P01.mp3',
    captionSrc: '/L03/C06/A04/ME1-L03-C06-A04-P01.srt',
    top: -10,
  };

  const title = ['We Have a Cat on Our Team!'];
  const text = (
    <Typography style={{ whiteSpace: 'pre-wrap' }}>
      {'   '}
      Coach Biscuit’s team was on the field for Saturday practice. “I have some exciting news for you. We have a new member,” Coach Biscuit said.
      “Everyone, let’s welcome our new friend. Cathy, please come out.”
    </Typography>
  );

  const info: IHE01602Info = {
    altText: '',
    hiddenAltText: '잔디밭에 강아지들이 모여 있다. 빨간색 호루라기를 차고 있는 갈색 강아지 뒤로 고양이 한 마리가 숨어 있는 모습.',
    text: text,
    title: title,
    imageSrc: '/L03/C06/A04/ME1-L03-C06-A04-P01.jpg',
    imageWidth: '320px',
    imageHeight: '370px',
  };

  return <HE01602 headerInfo={headerInfo} audioInfo={audioInfo} info={info} />;
};

export default P01;
