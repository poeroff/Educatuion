import SP031HE03701 from './components/SP031HE03701';

const P04 = ({ _page = 'P04' }: { _page?: string }) => {
  const headerText = '[Read] 단어 연습';
  const questionText = '다음 단어의 알맞은 뜻을 고르세요.';

  const word = 'consume';
  const choices = ['소각하다', '소비하다', '흡수하다'];
  const answer = '소비하다';

  return (
    <SP031HE03701
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
