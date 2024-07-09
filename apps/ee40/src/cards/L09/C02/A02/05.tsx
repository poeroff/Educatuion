import EEL01C02A04P01, { PageProps } from '@/Pages/EEL01C02A04P01';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Story 2',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '민지의 자는 어디에 있었나요?',
  },
  getCorrectData,
  getDefaultData,
  pageNumber: 5,
  mainKey: 5,
  subKey: 'TEXT-05',
  images: {
    src: '/L09/C02/A02/EE4-L09-C02-A02-P01.JPG',
    alt: `네 개의 장면으로 이루어진 만화.
첫 번째 장면: 세 명의 아이들이 종이 상자와 다양한 재료들을 사용해 무언가를 만들고 있다. 한 아이가 종이 상자를 들고 있고, 다른 아이들이 도와주고 있다.
두 번째 장면: 두 명의 아이가 테이블에서 상자 자동차를 만들고 있다. 한 아이는 차를 꾸밀 재료들을 준비하고 있다.
세 번째 장면: 한 아이가 상자 자동차에 디테일을 추가하고 있다. 옆에 있는 아이는 다양한 색의 물감을 준비하고 있다.
네 번째 장면: 세 명의 아이들이 상자 자동차를 페인트로 꾸미고 있다. 노란색 귀여운 캐릭터가 완성된 상자 자동차를 상상하며 기뻐하고 있다.
`,
    title: `네 개의 장면으로 이루어진 만화.
첫 번째 장면: 세 명의 아이들이 종이 상자와 다양한 재료들을 사용해 무언가를 만들고 있다. 한 아이가 종이 상자를 들고 있고, 다른 아이들이 도와주고 있다.
두 번째 장면: 두 명의 아이가 테이블에서 상자 자동차를 만들고 있다. 한 아이는 차를 꾸밀 재료들을 준비하고 있다.
세 번째 장면: 한 아이가 상자 자동차에 디테일을 추가하고 있다. 옆에 있는 아이는 다양한 색의 물감을 준비하고 있다.
네 번째 장면: 세 명의 아이들이 상자 자동차를 페인트로 꾸미고 있다. 노란색 귀여운 캐릭터가 완성된 상자 자동차를 상상하며 기뻐하고 있다.
`,
  },
};

const P05 = () => {
  return <EEL01C02A04P01 {...pageInfo} />;
};

export default P05;
