import SP031HE03701 from './components/SP031HE03701';

interface P04Props {
  pageNumber?: string;
  store?: 'SP03-1' | 'SP03-2';
}

const P04 = ({ pageNumber = 'p04', store }: P04Props) => {
  const headerText = '[Read] 단어 연습';
  const questionText = '다음 단어의 알맞은 뜻을 고르세요.';

  const word = 'behavior';
  const choices = ['행동', '특성', '장치'];
  const answer = '행동';

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

export default P04;
