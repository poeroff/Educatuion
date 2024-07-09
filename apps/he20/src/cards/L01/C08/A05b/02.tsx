import HE2L01C08A05b, { IHE2L01C08A05b } from './HE2L01C08A05b';

const P02 = () => {
  const props: IHE2L01C08A05b = {
    subQuestion: '2. 내가 휴대폰을 확인했을 때 여동생이 저에게 여러 번 전화한 것을 발견했다.',
    text1: 'When I checked my phone, I found that my sister',
    text2: 'me several times. (call)',
    pageKey: 'p02',
  };

  return <HE2L01C08A05b {...props} />;
};

export default P02;
