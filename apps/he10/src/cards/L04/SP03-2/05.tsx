import SP032HE03701 from './components/SP032HE03701';

const P05 = ({ _page = 'P05' }: { _page?: string }) => {
  const headerText = '[Read] 단어  연습';
  const questionText = '다음 단어의 알맞은 뜻을 고르세요.';

  const word = 'potent';
  const choices = ['강력한', '방출하다', '흡수하다'];
  const answer = '강력한';

  return (
    <SP032HE03701
      headerText={headerText}
      questionText={questionText}
      word={word}
      choices={choices}
      answer={answer}
      pageNumber={_page.toLowerCase()}
      pageState='p05'
    />
  );
};

export default P05;
