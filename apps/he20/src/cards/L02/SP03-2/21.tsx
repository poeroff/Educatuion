import HE02201_SP03_2 from './component/HE02201_SP03_2';

const P21 = () => {
  const pageNum = 'P21';
  const answer: string[] = ['while', 'the second', 'option', 'seems like', 'a bad choice'];
  const sentence = {
    kr: '첫 번째 선택 사항은 매력적인 방식으로 제시되는 반면, 두 번째 옵션은 나쁜 선택처럼 보인다.',
    en: ['The first option is presented in an appealing way, ', '', '.'],
  };

  const chipButtonInfo = [
    {
      text: 'the second',
    },
    {
      text: 'seems like',
    },
    {
      text: 'option',
    },
    {
      text: 'while',
    },
    {
      text: 'a bad choice',
    },
  ];

  return <HE02201_SP03_2 pageNum={pageNum} answer={answer} sentence={sentence} chipButtonTexts={chipButtonInfo}></HE02201_SP03_2>;
};

export default P21;
