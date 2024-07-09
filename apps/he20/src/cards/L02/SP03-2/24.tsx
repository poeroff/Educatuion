import HE02201_SP03_2 from './component/HE02201_SP03_2';

const P24 = () => {
  const pageNum = 'P24';
  const answer: string[] = ['will', 'protect', 'us', 'from', 'manipulation'];
  const sentence = {
    kr: '우리의 관심과 노력이 조종으로부터 우리를 보호하고, 우리가 이 디지털 시대에 현명한 결정을 내릴 수 있도록 해 줄 것이다.',
    en: ['Our attention and efforts ', '', ' and enable us to make wise decisions in this digital age.'],
  };

  const chipButtonInfo = [
    {
      text: 'us',
    },
    {
      text: 'manipulation',
    },
    {
      text: 'will',
    },
    {
      text: 'from',
    },
    {
      text: 'protect',
    },
  ];

  return <HE02201_SP03_2 pageNum={pageNum} answer={answer} sentence={sentence} chipButtonTexts={chipButtonInfo}></HE02201_SP03_2>;
};

export default P24;
