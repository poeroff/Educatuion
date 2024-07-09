import HE03701_SP03_2 from './component/HE03701_SP03_2';

const P05 = () => {
  const pageNum = 'P05';

  const headerText = '[Read] 단어  연습';
  const questionText = '다음 단어의 알맞은 뜻을 고르세요.';

  const word = 'deliberately';
  const choices = ['확인해 주다', '심해지다', '의도적으로'];
  const answer = '의도적으로';

  return <HE03701_SP03_2 pageNum={pageNum} headerText={headerText} questionText={questionText} word={word} choices={choices} answer={answer} />;
};

export default P05;
