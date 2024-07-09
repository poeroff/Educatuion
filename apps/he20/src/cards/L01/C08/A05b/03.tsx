import HE2L01C08A05b, { IHE2L01C08A05b } from './HE2L01C08A05b';

const P03 = () => {
  const props: IHE2L01C08A05b = {
    subQuestion: '3. 그는 집에 도착하자마자 누군가 집에 침입한 것을 발견했다.',
    text1: 'As soon as he arrived home, he noticed that someone',
    text2: 'into his house. (break)',
    pageKey: 'p03',
  };

  return <HE2L01C08A05b {...props} />;
};

export default P03;
