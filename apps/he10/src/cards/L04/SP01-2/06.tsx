import SP011HE03702 from './components/SP011HE03702';

const P06 = ({ _page = 'P06' }: { _page?: string }) => {
  const headerText = '[Listen & Speak] 단어 연습';
  const questionText = '다음 단어의 알맞은 뜻을 고르세요.';

  const word = 'alert';
  const choices = ['바느질하다', '가정하다', '경계하는'];
  const answer = '경계하는';

   return (
    <SP011HE03702
      headerText={headerText}
      questionText={questionText}
      word={word}
      choices={choices}
      answer={answer}
      pageNumber={_page.toLowerCase()}
    />
  );
};

export default P06;
