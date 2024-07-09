import SP011HE03702 from './components/SP011HE03702';

const P05 = ({ _page = 'P05' }: { _page?: string }) => {
  const headerText = '[Listen & Speak] 단어 연습';
  const questionText = '다음 단어의 알맞은 뜻을 고르세요.';

  const word = 'ecosystem';
  const choices = ['생태계', '물질', '소비'];
  const answer = '생태계';

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

export default P05;
