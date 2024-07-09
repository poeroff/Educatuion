import SP012HE03701 from './components/SP012HE03701';

const P09 = () => {
  const headerText = '[Listen & Speak] 단어 연습';
  const questionText = '다음 뜻의 알맞은 영어 단어를 쓰세요.';

  const word = '믿을 수 없는';
  const answer = 'incredible';

  return <SP012HE03701 headerText={headerText} questionText={questionText} word={word} answer={answer} pageNumber='p09' />;
};

export default P09;
