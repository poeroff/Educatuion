import HE02201_SP03_2 from './component/HE02201_SP03_2';

const P23 = () => {
  const pageNum = 'P23';
  const answer: string[] = ['essential', 'to', 'avoid', 'potential harm', 'and economic loss'];
  const sentence = {
    kr: '다크 패턴에 대한 인식을 형성하는 것 또한 잠재적인 피해와 경제적 손실을 피하기 위해 필수적이다.',
    en: ['Developing an awareness of dark patterns is also ', '', '.'],
  };

  const chipButtonInfo = [
    {
      text: 'avoid',
    },
    {
      text: 'and economic loss',
    },
    {
      text: 'potential harm',
    },
    {
      text: 'to',
    },
    {
      text: 'essential',
    },
  ];

  return <HE02201_SP03_2 pageNum={pageNum} answer={answer} sentence={sentence} chipButtonTexts={chipButtonInfo}></HE02201_SP03_2>;
};

export default P23;
