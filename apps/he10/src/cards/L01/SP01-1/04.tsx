import SP011HE03701 from './components/SP011HE03701';

const P04 = () => {
  const headerText = '[Listen & Speak] 단어 연습';
  const questionText = '다음 단어의 알맞은 뜻을 고르세요.';

  const word = 'demanding';
  const choices = ['힘든', '개선', '발표'];
  const answer = '힘든';

  return <SP011HE03701 headerText={headerText} questionText={questionText} word={word} choices={choices} answer={answer} pageNumber='p04' />;
};

export default P04;
