import HE03701 from '@maidt-cntn/pages/HE-037-01';

const P05 = () => {
  const headerText = '[Listen & Speak] 단어 연습';
  const questionText = '다음 단어의 알맞은 뜻을 고르세요.';

  const word = 'virtual';
  const choices = ['가상의', '힘든', '놀라운'];
  const answer = '가상의';

  return <HE03701 headerText={headerText} questionText={questionText} word={word} choices={choices} answer={answer} />;
};

export default P05;
