import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import { TMainHeaderInfoTypes, IQuestionProps, Typography } from '@maidt-cntn/ui';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Small Actions, Big Change (4)',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: '해석을 확인해 봅시다.',
  };

  const data: IListenAndAnswer[] = [
    {
      originText: (
        <Typography useGap={false} weight='var(--font-weight-bold)'>
          DAY 7 Visit a zero-waste shop.
        </Typography>
      ),
      translation: '일곱째 날: 제로웨이스트 상점을 방문하라.',
    },
    {
      originText: 'This morning, I ran out of shampoo.',
      translation: '오늘 아침에 나는 샴푸를 다 써 버렸다.',
    },
    {
      originText: 'I took the empty bottle and went to a zero-waste shop.',
      translation: '나는 빈 병을 가지고 제로웨이스트 상점에 갔다.',
    },
    {
      originText: 'I filled my bottle with shampoo there.',
      translation: '나는 거기서 나의 병을 샴푸로 채웠다.',
    },
    {
      originText: 'It smelled so good!',
      translation: '그것은 무척 좋은 냄새가 났다!',
    },
    {
      originText: 'This way, I cut down on plastic.',
      translation: '이런 방법으로 나는 플라스틱을 줄였다.',
    },
  ];

  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} data={data} />;
};

export default P03;
