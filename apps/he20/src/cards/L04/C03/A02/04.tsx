import { TMainHeaderInfoTypes, IAudioPlayerProps, IQuestionProps } from '@maidt-cntn/ui';
import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';

const headerInfo: TMainHeaderInfoTypes = {
  headerText: 'Listen and Answer',
};

const questionInfo: IQuestionProps = {
  text: 'Scripts',
};

const data: IListenAndAnswer[] = [
  {
    originText: 'Hello, I’m Jennifer Jones, a food scientist.',
    translation: '안녕하세요, 저는 식품 과학자 Jennifer Jones입니다.',
    label: 'W',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: 'Today, I’ll talk about the future of food.',
    translation: '오늘, 저는 식량의 미래에 대해 이야기하겠습니다.',
    inLine: true,
  },
  {
    originText:
      'People are worried that, in the future, the soil might lose nutrients or the climate could change in such a way that we won’t be able to grow crops.',
    translation: '사람들은 미래에 토양이 영양분을 잃거나 기후가 변해서 작물을 재배할 수 없게 될까 봐 걱정하고 있습니다.',
    inLine: true,
  },
  {
    originText: 'However, thanks to technology, we will be able to grow crops under LED lights in AI-controlled buildings rather than on land.',
    translation: '하지만 기술 덕분에 땅이 아닌 AI가 제어하는 건물 안, LED 조명 아래에서 작물을 재배할 수 있게 될 것입니다.',
    inLine: true,
  },
  {
    originText: 'Others are concerned about meat consumption because of the greenhouse gases produced by cows.',
    translation: '소가 배출하는 온실가스 때문에 육류 소비에 대해 우려하는 사람들도 있습니다.',
    inLine: true,
  },
  {
    originText: 'Not to worry.',
    translation: '걱정하지 마세요.',
    inLine: true,
  },
  {
    originText: 'Food scientists have been developing meat with animal cells or plant-based materials in laboratories.',
    translation: '식품 과학자들은 실험실에서 동물 세포나 식물 기반의 재료로 고기를 개발하고 있습니다.',
    inLine: true,
  },
  {
    originText: 'This laboratory meat tastes almost exactly the same as real meat.',
    translation: '이 실험실 고기는 실제 고기와 거의 똑같은 맛을 냅니다.',
    inLine: true,
  },
  {
    originText: 'I believe that technology will make the future of food truly bright.',
    translation: '저는 기술이 식품의 미래를 정말 밝게 만들 것이라고 믿습니다.',
    inLine: true,
  },
  {
    originText: 'Future food is expected to be both delicious and environmentally friendly.',
    translation: '미래의 음식은 맛있고 환경 친화적일 것으로 예상됩니다.',
    inLine: true,
  },
];

const audioInfo: IAudioPlayerProps = {
  audioSrc: '/L04/C03/A02/HE2-L04-C03-A02-02.mp3',
  captionSrc: '/L04/C03/A02/HE2-L04-C03-A02-02.srt',
};

const P04 = () => {
  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} data={data} audioInfo={audioInfo} />;
};

export default P04;
