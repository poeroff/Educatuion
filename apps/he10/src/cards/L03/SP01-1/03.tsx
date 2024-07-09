import L03SP011HE03701 from './components/L03SP011HE03701';

const P03 = ({ _page = 'p03' }) => {
  const headerText = '[Listen & Speak] 단어 연습';
  const questionText = '다음 단어의 알맞은 뜻을 고르세요.';

  const word = 'notice';
  const choices = ['믿을 수 없는', '번갈아 하다', '알아차리다'];
  const answerIndex = '알아차리다';

  return (
    <L03SP011HE03701
      headerText={headerText}
      questionText={questionText}
      word={word}
      choices={choices}
      answer={answerIndex}
      pageNumber='p03'
      _page={_page}
    />
  );
};

export default P03;
