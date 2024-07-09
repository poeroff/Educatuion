import SP031HE03701 from './components/SP031HE03701';

const P06 = ({ _page = 'P06' }: { _page?: string }) => {
  const headerText = '[Read] 단어 연습';
  const questionText = '다음 뜻의 알맞은 영어 단어를 쓰세요.';

  const word = '불순물';
  const answer = 'impurity';

  return (
    <SP031HE03701 headerText={headerText} questionText={questionText} word={word} answer={answer} pageNumber={_page.toLowerCase()} pageState='p06' />
  );
};

export default P06;
