import SP011HE03701 from './components/SP011HE03701';

const P06 = () => {
  const headerText = '[Listen & Speak] 단어 연습';
  const questionText = '다음 뜻의 알맞은 영어 단어를 쓰세요.';

  const word = '현대식의';
  const answer = 'up to date';

  return <SP011HE03701 headerText={headerText} questionText={questionText} word={word} answer={answer} pageNumber='p06' />;
};

export default P06;
