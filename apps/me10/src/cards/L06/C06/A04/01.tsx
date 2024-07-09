import HE01602, { IHE01602Info } from '@maidt-cntn/pages/HE-016-02';
import { IAudioPlayerProps, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Who Do I Want to Be? (1)',
    headerPattern: 'text',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L06/C06/A04/ME1-L06-C06-A04-P01.mp3',
    captionSrc: '/L06/C06/A04/ME1-L06-C06-A04-P01.srt',
    top: -10,
  };

  const title = ['Who Do I Want to Be?'];
  const text = (
    <>
      <Typography style={{ whiteSpace: 'pre-wrap' }}>
        {'   '}My teacher told us about tomorrow’s presentation. He asked us, “What do you want to be when you grow up?” I said to myself, “Oh, no.
        Not again! What do I want to be? I have no idea.”
      </Typography>
      <Typography style={{ whiteSpace: 'pre-wrap' }}>
        {'   '}At home, I asked my family about their dream jobs. Dad said, “Well, I wanted to be an astronaut when I was young. I wanted to travel to
        the moon.”
      </Typography>
      <Typography style={{ whiteSpace: 'pre-wrap' }}>
        {'   '}“When I grow up, I’m going to be a robot designer,” said my big sister Angela. My little sister Sophie shouted, “I’m going to be a
        superhero or a bird!” Dad asked me, “What about you, Noah? What do you want to be?” I was stressed out.
      </Typography>
    </>
  );

  const info: IHE01602Info = {
    altText: '',
    hiddenAltText:
      '가족들이 소파에 앉아 자신들의 꿈에 대해 이야기 하고 있다. 각자의 꿈이 말풍선 안에 들어가 있다. 아버지는 어린시절 장래희망이 우주비행사였다고 말하고 있고 누나는 어른이 되면 로봇 디자이너가 될 것이라고 말하고 있다. 여동생은 슈퍼히어로나 새가 되고 싶다고 말하고 있다. ‘나’는 생각에 잠겨있다.',
    text: text,
    title: title,
    imageSrc: '/L06/C06/A04/ME1-L06-C06-A04-P01.jpg',
    imageWidth: '320px',
    imageHeight: '228.91px',
  };

  return <HE01602 headerInfo={headerInfo} audioInfo={audioInfo} info={info} />;
};

export default P01;
