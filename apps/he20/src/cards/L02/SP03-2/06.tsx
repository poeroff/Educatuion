import HE03701_SP03_2 from './component/HE03701_SP03_2';

const P06 = () => {
  const pageNum = 'P06';

  const headerText = '[Read] 단어  연습';
  const questionText = '다음 단어의 알맞은 뜻을 고르세요.';

  const word = 'leak';
  const choices = ['유출', '유효한', '상업'];
  const answer = '유출';

  return <HE03701_SP03_2 pageNum={pageNum} headerText={headerText} questionText={questionText} word={word} choices={choices} answer={answer} />;
};

export default P06;
