import SP011HE03701 from './components/SP011HE03701';

const P05 = () => {
  const headerText = '[Listen & Speak] 단어 연습';
  const questionText = '다음 뜻의 알맞은 영어 단어를 쓰세요.';

  const word = '보람 있는';
  const answer = 'rewarding';

  return <SP011HE03701 headerText={headerText} questionText={questionText} word={word} answer={answer} pageNumber='p05' />;
};

export default P05;
