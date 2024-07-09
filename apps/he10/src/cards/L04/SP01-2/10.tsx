import SP011HE03702 from './components/SP011HE03702';

const P10 = ({ _page = 'P10' }: { _page?: string }) => {
  const headerText = '[Listen & Speak] 단어 연습';
  const questionText = '다음 뜻의 알맞은 영어 단어를 쓰세요.';

  const word = '회복하다';
  const answer = 'recover';

  return <SP011HE03702 headerText={headerText} questionText={questionText} word={word} answer={answer} pageNumber={_page.toLowerCase()} />;
};

export default P10;
