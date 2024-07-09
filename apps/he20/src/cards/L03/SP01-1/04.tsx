import L03SP011HE03701 from './components/L03SP011HE03701';

const P04 = ({ _page = 'p04' }) => {
  const headerText = '[Listen & Speak] 단어 연습';
  const questionText = '다음 단어의 알맞은 뜻을 고르세요.';

  const word = 'combination';
  const choices = ['조합', '우비', '연기'];
  const answer = '조합';

  return (
    <L03SP011HE03701 headerText={headerText} questionText={questionText} word={word} choices={choices} answer={answer} pageNumber='p04' _page={_page} />
  );
};

export default P04;
