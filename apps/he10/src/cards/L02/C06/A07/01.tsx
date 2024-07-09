import HE01602, { IHE01602Info } from '@maidt-cntn/pages/HE-016-02';
import { IAudioPlayerProps, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Gathering of the Whakapapa (5)',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C06/A07/HE1-L02-C06-A07-P01.mp3',
    captionSrc: '/L02/C06/A07/HE1-L02-C06-A07-P01.srt',
  };

  const text = (
    <Typography>
      {` It was early morning and still dark when we returned to Auntie’s place. All the lights were on, and the village people were waiting for
            us. Smiling, Nani Tama lifted up the whakapapa and offered it to the village. Our hearts were full because our grandfather had saved our
            past for us. Our Nani Tama smiled again. His smile grew tired. He sighed. “At last, I may go now.” Then, he closed his eyes. “No, Dad!”
            Auntie Hiraina cried. The sun burst across the hills.`}
    </Typography>
  );

  const info: IHE01602Info = {
    altText:
      '나무 집 앞에서 할아버지가 이모가 잡고 있는 의자에 앉아 책을 읽어주고 있다. 여러 명의 사람들이 이를 귀담아 듣고 있고, 뒤로는 석양이 지고 있다.',
    text: text,
    imageSrc: '/L02/C06/A07/HE1-L02-C06-A07-P01.jpg',
    imageWidth: '300px',
    imageHeight: '403px',
  };

  return <HE01602 headerInfo={headerInfo} audioInfo={audioInfo} info={info} />;
};

export default P01;
