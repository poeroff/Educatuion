import SP011HE03701 from './components/SP011HE03701';

const P05 = ({ _page = 'P05' }: { _page?: string }) => {
  const headerText = '[Listen & Speak] 단어 연습';
  const questionText = '다음 뜻의 알맞은 영어 단어를 쓰세요.';

  const word = '확인하다';
  const answer = 'confirm';

  return (
    <SP011HE03701 headerText={headerText} questionText={questionText} word={word} answer={answer} pageNumber={_page.toLowerCase()} pageState='p05' />
  );
};

export default P05;
