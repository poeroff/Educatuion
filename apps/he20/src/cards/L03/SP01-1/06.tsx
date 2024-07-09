import L03SP011HE03701 from './components/L03SP011HE03701';

const P06 = ({ _page = 'p06' }) => {
  const headerText = '[Listen & Speak] 단어 연습';
  const questionText = '다음 뜻의 알맞은 영어 단어를 쓰세요.';

  const word = '(국가, 사회의) 유산';
  const answer = 'heritage';

  return <L03SP011HE03701 headerText={headerText} questionText={questionText} word={word} answer={answer} pageNumber='p06' _page={_page} />;
};

export default P06;
