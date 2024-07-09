import HE03701 from '@maidt-cntn/pages/HE-037-01';

const P09 = () => {
  const headerText = '[Listen & Speak] 단어 연습';
  const questionText = '다음 뜻의 알맞은 영어 단어를 쓰세요.';

  const word = '발표';
  const answer = 'announcement';

  return <HE03701 headerText={headerText} questionText={questionText} word={word} answer={answer} />;
};

export default P09;
