import SP031HE03701 from './components/SP031HE03701';

interface P05Props {
  pageNumber?: string;
  store?: 'SP03-1' | 'SP03-2';
}

const P05 = ({ pageNumber = 'p05', store }: P05Props) => {
  const headerText = '[Read] 단어 연습';
  const questionText = '다음 뜻의 알맞은 영어 단어를 쓰세요.';

  const word = '어울리다';
  const answer = 'get along';

  return <SP031HE03701 headerText={headerText} questionText={questionText} word={word} answer={answer} pageNumber={pageNumber} store={store} />;
};

export default P05;
