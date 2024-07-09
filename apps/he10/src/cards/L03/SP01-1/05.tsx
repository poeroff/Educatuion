import L03SP011HE03701 from './components/L03SP011HE03701';

const P05 = ({ _page = 'p05' }) => {
  const headerText = '[Listen & Speak] 단어 연습';
  const questionText = '다음 뜻의 알맞은 영어 단어를 쓰세요.';

  const word = '구 모양의';
  const answer = 'sphere-shaped';

  return <L03SP011HE03701 headerText={headerText} questionText={questionText} word={word} answer={answer} pageNumber='p05' _page={_page} />;
};

export default P05;
