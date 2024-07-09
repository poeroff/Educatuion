import HE01602, { IHE01602Info } from '@maidt-cntn/pages/HE-016-02';
import { IAudioPlayerProps, Typography } from '@maidt-cntn/ui';

const P01 = () => {
  const headerInfo = {
    headerText: 'Gathering of the Whakapapa (4)',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C06/A06/HE1-L02-C06-A06-P01.mp3',
    captionSrc: '/L02/C06/A06/HE1-L02-C06-A06-P01.srt',
  };

  const text = (
    <Typography>
      Just before noon, we arrived at a small town called Murupara. “Where do we go now?” I asked Nani. He did not reply, but he was searching inside
      himself, staring at the small houses. Then, at a street corner, he told us to turn. After turning the corner, we saw an old man standing in
      front of a house. He welcomed Nani Tama with a gentle smile, but in his eyes, I saw the message, “We must hurry.” <br />
      Now that day seems like a dream to me. I remember the two old men sitting at the table and the soft sounds of the Maori words as they talked.
      All through the quiet afternoon and into the evening, they recalled missing names. I had a strange feeling that there were other people in the
      room. I felt as if people from the past were looking over the shoulders of the two old men to see if the work was correct. Finally, they
      stopped. It was done. After a moment of silence, the old man whispered to Nani, “Goodbye, friend.” Crying, they pressed their noses together to
      say goodbye.
    </Typography>
  );

  const info: IHE01602Info = {
    altText: '할아버지와 한 노인이 책상 위에 책을 펴놓고 진지하게 이야기하고 있다.',
    text: text,
    imageSrc: '/L02/C06/A06/HE1-L02-C06-A06-P01.jpg',
    imageWidth: '278px',
    imageHeight: '300px',
  };

  return <HE01602 headerInfo={headerInfo} audioInfo={audioInfo} info={info} />;
};

export default P01;
