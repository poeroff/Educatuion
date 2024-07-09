import HE2L01C08A05b, { IHE2L01C08A05b } from './HE2L01C08A05b';

const P04 = () => {
  const props: IHE2L01C08A05b = {
    subQuestion: '4. 나는 쿠키를 맛보는 순간 제빵사가 설탕을 너무 많이 넣었다는 것을 깨달았다 .',
    text1: 'The moment I tasted the cookies, I realized that the baker',
    text2: 'too much sugar in them. (put)',
    pageKey: 'p04',
  };

  return <HE2L01C08A05b {...props} />;
};

export default P04;
