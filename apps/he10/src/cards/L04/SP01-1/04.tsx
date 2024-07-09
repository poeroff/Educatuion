import SP011HE03701 from './components/SP011HE03701';

const P04 = ({ _page = 'P04' }: { _page?: string }) => {
  const headerText = '[Listen & Speak] 단어 연습';
  const questionText = '다음 단어의 알맞은 뜻을 고르세요.';

  const word = 'sew';
  const choices = ['경계하는', '바느질하다', '가정하다'];
  const answer = '바느질하다';

  return (
    <SP011HE03701
      headerText={headerText}
      questionText={questionText}
      word={word}
      choices={choices}
      answer={answer}
      pageNumber={_page.toLowerCase()}
      pageState='p04'
    />
  );
};

export default P04;
