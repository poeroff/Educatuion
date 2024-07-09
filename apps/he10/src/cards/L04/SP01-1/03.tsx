import SP011HE03701 from './components/SP011HE03701';

const P03 = ({ _page = 'P03' }: { _page?: string }) => {
  const headerText = '[Listen & Speak] 단어 연습';
  const questionText = '다음 단어의 알맞은 뜻을 고르세요.';

  const word = 'suppose';
  const choices = ['가정하다', '회복하다', '확인하다'];
  const answer = '가정하다';

  return (
    <SP011HE03701
      headerText={headerText}
      questionText={questionText}
      word={word}
      choices={choices}
      answer={answer}
      pageNumber={_page.toLowerCase()}
      pageState='p03'
    />
  );
};

export default P03;
