import HE03701 from '@maidt-cntn/pages/HE-037-01';

const P06 = () => {
  const headerText = '[Listen & Speak] 단어 연습';
  const questionText = '다음 단어의 알맞은 뜻을 고르세요.';

  const word = 'rewarding';
  const choices = ['놀라운', '~을/를 받을 만 하다', '보람 있는'];
  const answer = '보람 있는';

  return <HE03701 headerText={headerText} questionText={questionText} word={word} choices={choices} answer={answer} />;
};

export default P06;
