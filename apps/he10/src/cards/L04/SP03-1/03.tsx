import SP031HE03701 from './components/SP031HE03701';

const P03 = ({ _page = 'P03' }: { _page?: string }) => {
  const headerText = '[Read] 단어 연습';
  const questionText = '다음 단어의 알맞은 뜻을 고르세요.';

  const word = 'spring up';
  const choices = ['생겨나다', '~을 처리하다', '방출하다'];
  const answer = '생겨나다';

  return (
    <SP031HE03701
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
