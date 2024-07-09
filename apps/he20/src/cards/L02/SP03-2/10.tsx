import HE03701_SP03_2 from './component/HE03701_SP03_2';

const P10 = () => {
  const pageNum = 'P10';

  const headerText = '[Read] 단어  연습';
  const questionText = '다음 뜻의 알맞은 영어 단어를 쓰세요.';

  const word = '금지하다';
  const answer = 'ban';

  return <HE03701_SP03_2 pageNum={pageNum} headerText={headerText} questionText={questionText} word={word} answer={answer} />;
};

export default P10;
