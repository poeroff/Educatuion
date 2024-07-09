import HE2L01C08A05b, { IHE2L01C08A05b } from './HE2L01C08A05b';

const P01 = () => {
  const props: IHE2L01C08A05b = {
    subQuestion: '1. 가수들은 콘서트를 통해 번 돈을 모두 자선 단체에 기부했다.',
    text1: 'The singers donated all the money they',
    text2: 'from their concerts to charity. (earn)',
    pageKey: 'p01',
  };

  return <HE2L01C08A05b {...props} />;
};

export default P01;
