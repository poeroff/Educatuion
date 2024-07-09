import HE02201_SP03_2 from './component/HE02201_SP03_2';

const P22 = () => {
  const pageNum = 'P22';
  const answer: string[] = ['how', 'to', 'regulate', 'these deceptive', 'design patterns'];
  const sentence = {
    kr: '정부들은 이러한 기만적인 디자인 패턴을 어떻게 규제할 것인지에 대해 적극적으로 논의하고 있다.',
    en: ['Governments are actively discussing on ', '', '.'],
  };

  const chipButtonInfo = [
    {
      text: 'these deceptive',
    },
    {
      text: 'how',
    },
    {
      text: 'regulate',
    },
    {
      text: 'to',
    },
    {
      text: 'design patterns',
    },
  ];

  return <HE02201_SP03_2 pageNum={pageNum} answer={answer} sentence={sentence} chipButtonTexts={chipButtonInfo}></HE02201_SP03_2>;
};

export default P22;
