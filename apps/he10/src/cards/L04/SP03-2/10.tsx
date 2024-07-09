import SP032HE03701 from './components/SP032HE03701';

const P10 = ({ _page = 'P10' }: { _page?: string }) => {
  const headerText = '[Read] 단어 연습';
  const questionText = '다음 뜻의 알맞은 영어 단어를 쓰세요.';

  const word = '조치를 취하다';
  const answer = 'take steps';

  return (
    <SP032HE03701 headerText={headerText} questionText={questionText} word={word} answer={answer} pageNumber={_page.toLowerCase()} pageState='p10' />
  );
};

export default P10;
