import L03SP011HE03701 from './components/L03SP011HE03701';

const P03 = ({ _page = 'p03' }) => {
  const headerText = '[Listen & Speak] 단어 연습';
  const questionText = '다음 단어의 알맞은 뜻을 고르세요.';

  const word = 'performance';
  const choices = ['조합', '(국가, 사회의) 유산', '연기, 공연'];
  const answerIndex = '연기, 공연';

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
