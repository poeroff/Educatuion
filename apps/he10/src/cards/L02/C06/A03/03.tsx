import { TMainHeaderInfoTypes, IAudioPlayerProps, IQuestionProps } from '@maidt-cntn/ui';
import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';

const headerInfo: TMainHeaderInfoTypes = {
  headerText: 'Gathering of the Whakapapa (1)',
};

const questionInfo: IQuestionProps = {
  text: 'Translations',
  size: 'medium',
};

const data: IListenAndAnswer[] = [
  {
    originText: `The phone rang, and it was my dad calling from my hometown, Waituhi.`,
    translation: `전화벨이 울렸고, 내 고향 와이투히에서 아버지가 건 전화였습니다.`,
  },
  {
    originText: `“Can you take a week off?” he asked.`,
    translation: `“일주일만 시간 낼 수 있니?” 아버지가 물으셨습니다.`,
  },
  {
    originText: `Your Nani Tama wants you here.”`,
    translation: `“너희 할아버지 타마가 보고 싶어 하신다.＂`,
  },
  {
    originText: `“But Dad!” I answered.`,
    translation: `“네? 아빠!” 내가 대답했습니다.`,
  },
  {
    originText: `“My boss won’t let me take any more time off.”`,
    translation: `“제 상사가 더 이상 쉬는 것을 허락하지 않을 거에요.＂`,
  },
  {
    originText: `The phone went silent, and then I heard my grandfather say faintly, “I need your help, Grandson. I must go to Murupara to f inish the whakapapa. Drive me there. Hurry, I may not have much time.”`,
    translation: `전화가 조용해졌고, 할아버지가 희미하게 말했습니다. “손자야, 도움이 필요하다. 화카파파를 끝내려면 무루파라로 가야 해. 나를 그곳으로 데려다주렴. 서둘러야해. 시간이 별로 없다.`,
  },
  {
    originText: `I just knew I had no choice. “All right, Nani,” I replied with a sigh. “I’ll  come.”`,
    translation: `나는 선택의 여지가 없다는 것을 알았습니다. “알았어, 나니.” 나는 한숨을 쉬며 대답했습니다. “내가 갈게.”`,
  },
];

const P03 = () => {
  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} data={data} />;
};

export default P03;
