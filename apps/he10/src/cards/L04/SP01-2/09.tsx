import SP011HE03702 from './components/SP011HE03702';

const P09 = ({ _page = 'P09' }: { _page?: string }) => {
  const headerText = '[Listen & Speak] 단어 연습';
  const questionText = '다음 뜻의 알맞은 영어 단어를 쓰세요.';

  const word = '전자제품';
  const answer = 'appliance';

  return <SP011HE03702 headerText={headerText} questionText={questionText} word={word} answer={answer} pageNumber={_page.toLowerCase()} />;
};

export default P09;
