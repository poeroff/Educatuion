import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import { IAudioPlayerProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

const headerInfo: TMainHeaderInfoTypes = {
  headerText: 'A. Listening',
};

const audioInfo: IAudioPlayerProps = {
  audioSrc: '/L03/C11/A02/HE2-L03-C11-A02.mp3',
  captionSrc: '/L03/C11/A02/HE2-L03-C11-A02.srt',
};

const data: IListenAndAnswer[] = [
  {
    originText: `I’m so excited about the Mozart concert tonight.`,
    translation: `오늘 밤 모차르트 콘서트가 너무 기대돼요.`,
    label: 'B',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: `Me, too!`,
    translation: `저도요!`,
    label: 'G',
    labelColor: 'var(--color-yellow-100)',
  },
  {
    originText: `I’ve always loved Mozart, but I’ve never seen a live classical performance before.`,
    translation: `저는 항상 모차르트를 사랑해왔지만, 라이브 클래식 공연은 본 적이 없어요.`,
    inLine: true,
  },
  {
    originText: `I’m sure you’ll love it.`,
    translation: `분명 좋아하실 거예요.`,
    label: 'B',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: `Hearing it live is completely  different  from  listening  to  a recorded piece.`,
    translation: `라이브로 듣는 것은 녹음된 곡을 듣는 것과는 완전히 다릅니다.`,
    inLine: true,
  },
  {
    originText: `I can’t wait!`,
    translation: `너무 기대돼요!`,
    label: 'G',
    labelColor: 'var(--color-yellow-100)',
  },
  {
    originText: `Is there anything I should be careful about during the performance?`,
    translation: `공연 중에 제가 조심해야 할 것이 있나요?`,
    inLine: true,
  },
  {
    originText: `I don’t want to bother other audience members at my first live classical concert.`,
    translation: `첫 라이브 클래식 콘서트에서 다른 관객들에게 폐를 끼치고 싶지 않아요.`,
    inLine: true,
  },
  {
    originText: `Well, you’re not allowed to use your cell phone.`,
    translation: `음, 당신은 휴대폰을 사용하는 것이 허락되지 않습니다.`,
    label: 'B',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: `Also, you don’t want to clap in the middle of a piece.`,
    translation: `또한, 당신은 작품 중간에 박수를 치고 싶지 않을 거에요.`,
    inLine: true,
  },
  {
    originText: `Wait until each piece has finished.`,
    translation: `각각의 작품이 끝날 때까지 기다리세요.`,
    inLine: true,
  },
  {
    originText: `Oh, I didn’t know that.`,
    translation: `아, 몰랐어요.`,
    label: 'G',
    labelColor: 'var(--color-yellow-100)',
  },
  {
    originText: `I’ll probably just clap when you clap!`,
    translation: `아마 당신이 박수 칠 때만 박수 칠 거예요!`,
    inLine: true,
  },
  {
    originText: `Right, just follow my lead!`,
    translation: `좋아요, 제 안내를 따라오세요!`,
    label: 'B',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: `Should I wear anything special?`,
    translation: `뭔가 특별한 옷을 입어야 하나요?`,
    label: 'G',
    labelColor: 'var(--color-yellow-100)',
  },
  {
    originText: `Do I need to dress up?`,
    translation: `정장을 입어야 하나요?`,
    inLine: true,
  },
  {
    originText: `You don’t want to dress too casually, but you don’t have to dress too formally, either.`,
    translation: `너무 캐주얼하게 입고 싶지도 않겠지만, 너무 포멀하게 입을 필요도 없어요.`,
    label: 'B',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: `Okay, I got it.`,
    translation: `알겠습니다.`,
    label: 'G',
    labelColor: 'var(--color-yellow-100)',
  },
  {
    originText: `Thanks for the tips!`,
    translation: `팁 감사합니다!`,
    inLine: true,
  },
];

const P03 = () => {
  return <HE00501 headerInfo={headerInfo} audioInfo={audioInfo} data={data} />;
};

export default P03;
