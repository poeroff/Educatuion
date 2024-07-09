import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import { IAudioPlayerProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'A. Listening',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C11/A02/HE1-L02-C11-A02.mp3',
    captionSrc: '/L02/C11/A02/HE1-L02-C11-A02.srt',
  };

  const BLabel = {
    label: 'B',
    labelColor: 'var(--color-yellow-100)',
  };

  const GLabel = {
    label: 'G',
    labelColor: 'var(--color-blue-100)',
  };

  const data: IListenAndAnswer[] = [
    {
      ...BLabel,
      originText: `What are you reading, Judy?`,
      translation: `뭘 읽고 있어, Judy?`,
    },
    {
      ...GLabel,
      originText: `Hi, Minho. I’m reading The Adventure of the Dancing Men from the Sherlock Holmes collection.`,
      translation: `안녕, Minho야. 나는 셜록 홈즈 컬렉션에서 <The Adventure of the Dancing Men>을 읽고 있어.`,
    },
    { originText: `It’s a fascinating story.`, translation: `정말 흥미로운 이야기야.`, inLine: true },
    {
      ...BLabel,
      originText: `Tell me more. I’m interested in detective novels as well.`,
      translation: `더 말해 줘. 나도 추리소설에 관심이 많아.`,
    },
    {
      ...GLabel,
      originText: `It’s about strange drawings found in a couple’s house.`,
      translation: `어느 부부의 집에서 발견된 이상한 그림에 관한 이야기야.`,
    },
    { originText: `Sherlock’s reasoning skills are surprising as always!`, translation: `셜록의 추리력은 언제나 놀랍지!`, inLine: true },
    {
      ...BLabel,
      originText: `That sounds fun. I’ll definitely have to read it then!`,
      translation: `재미있겠다. 꼭 읽어 봐야겠어!`,
    },
    { originText: `Do you have any other detective novels to recommend?`, translation: `혹시 추천해 줄 다른 추리소설이 있어??`, inLine: true },
    {
      ...GLabel,
      originText: `Well, I have a few books at home that I’ve enjoyed.`,
      translation: `글쎄, 집에 내가 읽던 책이 몇 권 있는데`,
    },
    { originText: `I’ll bring them in tomorrow if you want.`, translation: `원하면 내일 가져올게.`, inLine: true },
    {
      ...BLabel,
      originText: `That would be really kind of you. Thanks.`,
      translation: `정말 친절하구나. 고마워`,
    },
    {
      ...GLabel,
      originText: `You’re welcome. It’s great to have a friend with similar interests.`,
      translation: `천만에. 비슷한 관심사를 가진 친구가 있다는 것은 참 좋은 일이야.`,
    },
  ];

  return <HE00501 headerInfo={headerInfo} audioInfo={audioInfo} data={data} />;
};

export default P03;
