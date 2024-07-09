import SP032HE03701 from './components/SP032HE03701';

const P06 = ({ _page = 'P06' }: { _page?: string }) => {
  const headerText = '[Read] 단어  연습';
  const questionText = '다음 단어의 알맞은 뜻을 고르세요.';

  const word = 'compound';
  const choices = ['추출', '양', '화합물'];
  const answer = '화합물';

  return (
    <SP032HE03701
      headerText={headerText}
      questionText={questionText}
      word={word}
      choices={choices}
      answer={answer}
      pageNumber={_page.toLowerCase()}
      pageState='p06'
    />
  );
};

export default P06;
