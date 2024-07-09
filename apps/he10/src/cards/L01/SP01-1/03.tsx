import SP011HE03701 from './components/SP011HE03701';

const P03 = () => {
  const headerText = '[Listen & Speak] 단어 연습';
  const questionText = '다음 단어의 알맞은 뜻을 고르세요.';

  const word = 'complete';
  const choices = ['완료하다', '제출하다', '현대식의'];
  const answer = '완료하다';

  return <SP011HE03701 headerText={headerText} questionText={questionText} word={word} choices={choices} answer={answer} pageNumber='p03' />;
};

export default P03;
