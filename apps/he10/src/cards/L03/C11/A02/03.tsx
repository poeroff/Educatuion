import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import { IAudioPlayerProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'A. Listening',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C11/A02/HE1-L03-C11-A02.mp3',
    captionSrc: '/L03/C11/A02/HE1-L03-C11-A02.srt',
  };

  const GLabel = {
    label: 'G',
    labelColor: 'var(--color-yellow-100)',
  };

  const MLabel = {
    label: 'M',
    labelColor: 'var(--color-blue-100)',
  };

  const data: IListenAndAnswer[] = [
    {
      ...GLabel,
      originText: `Dad, look at this photo from our last trip to Jeju!`,
      translation: `아빠, 지난 제주 여행에서 찍은 이 사진 좀 보세요!`,
    },
    {
      originText: `The sea looks cool, doesn’t it?`,
      translation: `바다가 멋져 보이죠?`,
      inLine: true,
    },
    {
      ...MLabel,
      originText: `Yes, it does.`,
      translation: `응, 그렇네.`,
    },
    {
      originText: `It looks much more beautiful because of its green color.`,
      translation: `초록색이라 더 멋져 보인다.`,
      inLine: true,
    },
    {
      ...GLabel,
      originText: `That’s true.`,
      translation: `맞아요.`,
    },
    {
      originText: `But Dad, I wonder why the sea sometimes looks green like this.`,
      translation: `그런데 아빠, 가끔 바다가 왜 이렇게 초록색으로 보이는지 궁금해요.`,
      inLine: true,
    },
    { originText: `Shouldn’t it be blue?`, translation: `파란색이어야 하지 않나요?`, inLine: true },
    {
      ...MLabel,
      originText: `Seas usually look blue because the water reflects more blue light back to our eyes compared to other colors.`,
      translation: `바다는 다른 색깔에 비해 물이 우리 눈에 푸른 빛을 더 많이 반사하기 때문에 일반적으로 파랗게 보여.`,
    },
    {
      ...GLabel,
      originText: `What about green oceans?`,
      translation: `그럼 초록색 바다는요?`,
    },
    {
      ...MLabel,
      originText: `Well, oceans appear green when the water reflects more green light.`,
      translation: `음, 물이 녹색을 더 많이 반사할 때 녹색으로 보인단다.`,
    },
    {
      originText: `When there are sea plants and sand in the water, they absorb the blue light and reflect the green light.`,
      translation: `그런데 바닷속에 바다 식물과 모래가 있으면 푸른 빛을 흡수하고 녹색 빛을 반사하지. `,
      inLine: true,
    },
    {
      ...GLabel,
      originText: `Oh, I see. That’s interesting.`,
      translation: `아, 그렇구나. 흥미롭네요.`,
    },
    { originText: `Thanks for the little science lesson, Dad.`, translation: `작은 과학 강의 감사해요 아빠.`, inLine: true },
    { originText: `I want to learn more about that.`, translation: `이것에 관해 더 알고 싶어요.`, inLine: true },
    {
      ...MLabel,
      originText: `That’s a great idea.`,
      translation: `좋은 생각이야.`,
    },
    { originText: `The ocean sure is a curious scientific wonder.`, translation: `바다는 분명 과학적 호기심을 자극하지.`, inLine: true },
  ];

  return <HE00501 headerInfo={headerInfo} audioInfo={audioInfo} data={data} />;
};

export default P03;
