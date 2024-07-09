import ME11401, { IData } from '@maidt-cntn/pages/ME-114-01';
import { IAudioPlayerProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'The King with Donkey Ears (4)',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/SL2/C01/A07/ME1-SL2-C01-A07-P01.mp3',
    captionSrc: '/SL2/C01/A07/ME1-SL2-C01-A07-P01.srt',
  };

  const imgSrc = '/SL2/C01/A03/ME1-SL2-C01-A03-6.jpg';
  const imgAlt = [
    '그 나무로 만든 북을 연주하자, The king has donkey ears. 라는 소리가 흘러나오고 사람들은 놀라서 쳐다 본다.',
    '왕이 나무 뒤에 숨어 멀리 군대가 오는 것을 큰 귀로 듣고 있다.',
  ];

  const data: IData[] = [
    {
      isTitle: true,
      content: `Scene 6 With the people`,
      color: 'var(--color-pink-600)',
    },
    {
      label: 'People',
      content: 'You’re the bravest king in the world! We love you!',
    },
    {
      label: 'King',
      content: 'I have donkey ears. Don’t you mind?',
    },
    {
      label: 'People',
      content: 'What are you talking about? Thanks to your big ears, we won! You’re the greatest king!',
    },
    {
      label: 'King',
      content: 'Really? You won’t laugh at me? From now on, I won’t hide my ears. In fact, I’m proud of them!',
    },
    {
      label: 'Narrator',
      content: 'The king finally loved himself. The king and his people lived happily ever after.',
    },
  ];

  return (
    <ME11401
      headerInfo={headerInfo}
      audioInfo={audioInfo}
      imgSrc={imgSrc}
      imgAlt={imgAlt}
      imgWidth='350px'
      labelWidth='25%'
      data={data}
      labelAlign='right'
    />
  );
};

export default P01;
