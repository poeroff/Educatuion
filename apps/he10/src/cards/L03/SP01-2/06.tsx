import SP012HE03701 from './components/SP012HE03701';

const P06 = () => {
  const headerText = '[Listen & Speak] 단어 연습';
  const questionText = '다음 단어의 알맞은 뜻을 고르세요.';

  const word = 'story';
  const choices = ['관찰', '신호', '층'];
  const answer = '층';

  return <SP012HE03701 headerText={headerText} questionText={questionText} word={word} choices={choices} answer={answer} pageNumber='p06' />;
};

export default P06;
