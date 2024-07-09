import SP031HE03701 from './components/SP031HE03701';

interface P03Props {
  pageNumber?: string;
  store?: 'SP03-1' | 'SP03-2';
}

const P03 = ({ pageNumber = 'p03', store }: P03Props) => {
  const headerText = '[Read] 단어 연습';
  const questionText = '다음 단어의 알맞은 뜻을 고르세요.';

  const word = 'responsive';
  const choices = ['유전적으로', '무작위로', '반응하는'];
  const answer = '반응하는';

  return (
    <SP031HE03701
      headerText={headerText}
      questionText={questionText}
      word={word}
      choices={choices}
      answer={answer}
      pageNumber={pageNumber}
      store={store}
    />
  );
};

export default P03;
