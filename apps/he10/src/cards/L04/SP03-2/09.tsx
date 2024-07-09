import SP032HE03701 from './components/SP032HE03701';

const P09 = ({ _page = 'P09' }: { _page?: string }) => {
  const headerText = '[Read] 단어 연습';
  const questionText = '다음 뜻의 알맞은 영어 단어를 쓰세요.';

  const word = '어마어마한';
  const answer = 'vast';

  return (
    <SP032HE03701 headerText={headerText} questionText={questionText} word={word} answer={answer} pageNumber={_page.toLowerCase()} pageState='p09' />
  );
};

export default P09;
