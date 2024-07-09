import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'The World of Picasso (4)',
  };
  const questionInfo = {
    text: '해석을 확인해 봅시다.',
  };

  const data: IListenAndAnswer[] = [
    {
      originText: 'Picasso saw things differently.',
      translation: '피카소는 사물들을 다르게 보았습니다.',
      inLine: true,
    },
    {
      originText: 'Even his fashion style was different.',
      translation: '그의 패션 스타일조차 달랐습니다.',
    },
    {
      originText: 'He wanted to buy this style of trousers, but he couldn’t find any.',
      translation: '그는 이런 스타일(가로줄 무늬)의 바지를 사고 싶어 했지만, 어떤 것도 찾을 수가 없었습니다.',
    },
    {
      originText: 'Everyone said, “When you wear them, you look short and fat.”',
      translation: '모두가 말했습니다. “당신이 그것을 입으면, 당신은 키가 작고 뚱뚱해 보일 거예요.”',
    },
    {
      originText: 'So he had to make a special order.',
      translation: '그래서 그는 특별 주문을 해야 했습니다.',
    },
    {
      originText: 'Picasso died at the age of 91, and until then he never stopped trying new things.',
      translation: '피카소는 91세의 나이에 사망했는데, 그때까지 그는 새로운 것을 시도하는 것을 절대 멈추지 않았습니다.',
      inLine: true,
    },
    {
      originText: 'He showed us the world in a special way.',
      translation: '그는 우리에게 특별한 방식으로 세상을 보여 주었습니다.',
    },
  ];
  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} data={data} />;
};
export default P02;
