import SP012HE03701 from './components/SP012HE03701';

const P05 = () => {
  const headerText = '[Listen & Speak] 단어 연습';
  const questionText = '다음 단어의 알맞은 뜻을 고르세요.';

  const word = 'take turns';
  const choices = ['믿을 수 없는', '번갈아 하다', '거르다'];
  const answer = '번갈아 하다';

  return <SP012HE03701 headerText={headerText} questionText={questionText} word={word} choices={choices} answer={answer} pageNumber='p05' />;
};

export default P05;
