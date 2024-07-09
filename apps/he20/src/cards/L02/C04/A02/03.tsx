import { TMainHeaderInfoTypes, IAudioPlayerProps, IQuestionProps } from '@maidt-cntn/ui';
import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';

const headerInfo: TMainHeaderInfoTypes = {
  headerText: 'Listen and Answer',
};

const questionInfo: IQuestionProps = {
  text: 'Scripts',
  size: 'medium',
};
const audioInfo: IAudioPlayerProps = {
  audioSrc: '/L02/C04/A02/HE2-L02-C04-A02.mp3',
  top: 10,
  right: 10,
};

const data: IListenAndAnswer[] = [
  {
    originText: 'Hello, everyone!',
    translation: '안녕하세요 , 여러분!',
    label: 'W',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: 'Welcome to live social media shopping for teenagers!',
    translation: '청소년을 위한 라이브 소셜 미디어 쇼핑에 오신 것을 환영합니다 !',
    inLine: true,
  },
  {
    originText: 'I’m Emma.',
    translation: '저는 Emma 예요 .',
    inLine: true,
  },
  {
    originText: 'Today, I’d like to show you one of our best-sellers, the GREEN PLUS skin-care set,which includes a facial wash and cream!',
    translation: '오늘은 저희 베스트셀러 중 하나인 그린 플러스 스킨케어 세트 ( 세안제와 크림이 포함된 제품 ) 를 소개해드리려고 합니다 !',
    inLine: true,
  },
  {
    originText: 'Lots of teenagers have oily but sensitive skin.​',
    translation: '많은 청소년들이 지성 피부이지만 민감한 피부를 가지고 있습니다.​',
    inLine: true,
  },
  {
    originText:
      'If you have similar issues, our all-natural products are better for your skin than the chemical-based ones commonly found in stores.',
    translation: '여러분도 비슷한 문제를 겪고 있다면 시중에서 흔히 볼 수 있는 화학 성분의 제품보다 천연 성분의 제품이 피부에 더 좋습니다 .​',
    inLine: true,
  },
  {
    originText: 'That’s because our products contain natural ingredients and vitamins.',
    translation: '천연 성분과 비타민이 함유되어 있기 때문입니다 .​',
    inLine: true,
  },
  {
    originText: 'As you can see, more than 90 percent of our customers are satisfied with our products and have felt the difference.',
    translation: '보시다시피 , 90% 이상의 고객이 저희 제품에 만족하고 그 차이를 느꼈습니다 .​',
    inLine: true,
  },
  {
    originText: 'The GREEN PLUS skin-care set usually sells for 40 dollars.',
    translation: '그린 플러스 스킨케어 세트는 보통 40 달러에 판매됩니다 .​',
    inLine: true,
  },
  {
    originText: 'But, order now and you can receive the entire set for only 30 dollars.',
    translation: '하지만 지금 주문하시면 단 30 달러에 전체 세트를 받으실 수 있습니다 .​',
    inLine: true,
  },
  {
    originText: 'Additionally, if you post a photo review on our website, we’ll send you a free sample of GREEN PLUS hand cream',
    translation: '또한 웹사이트에 포토 리뷰를 올리면 그린 플러스 핸드크림 샘플을 무료로 보내드립니다 .​',
    inLine: true,
  },
  {
    originText: 'Don’t miss out on this special opportunity today!',
    translation: '오늘 이 특별한 기회를 놓치지 마세요 !​',
    inLine: true,
  },
];

const P03 = () => {
  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} data={data} />;
};

export default P03;
