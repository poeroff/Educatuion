import EEL01C02A04P01, { PageProps } from '@/Pages/EEL01C02A04P01';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Story 2',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '엘라가 멋지다고 한 사람은 누구였나요?',
  },
  getCorrectData,
  getDefaultData,
  pageNumber: 5,
  mainKey: 5,
  subKey: 'TEXT-01',
  images: {
    src: '/L03/C02/A02/EE4-L03-C02-A02-P01.jpg',
    alt: `총 네 개의 장면으로 이루어진 만화.
    첫 번째 장면: '동물 보호 센터'라는 간판이 있는 건물 앞에서 아이들과 노란색 귀여운 캐릭터가 서 있다. 한 아이는 유리문을 닦고 있는 모습을 바라보고 있다.
    두 번째 장면: 울타리 안에서 여러 마리의 개들과 아이들이 함께 놀고 있다. 한 아이는 개 사료를 주고 있다.
    세 번째 장면: 한 남자가 여러 마리의 개들과 함께 울타리 안에서 걸어가고 있다. 남자는 선글라스를 끼고 있다.
    네 번째 장면: 실내에서 한 아이가 고양이와 함께 놀고 있다. 고양이들이 여러 군데에 앉아 있고, 한 아이는 장난감을 가지고 놀고 있다.`,
    title: `총 네 개의 장면으로 이루어진 만화.
첫 번째 장면: '동물 보호 센터'라는 간판이 있는 건물 앞에서 아이들과 노란색 귀여운 캐릭터가 서 있다. 한 아이는 유리문을 닦고 있는 모습을 바라보고 있다.
두 번째 장면: 울타리 안에서 여러 마리의 개들과 아이들이 함께 놀고 있다. 한 아이는 개 사료를 주고 있다.
세 번째 장면: 한 남자가 여러 마리의 개들과 함께 울타리 안에서 걸어가고 있다. 남자는 선글라스를 끼고 있다.
네 번째 장면: 실내에서 한 아이가 고양이와 함께 놀고 있다. 고양이들이 여러 군데에 앉아 있고, 한 아이는 장난감을 가지고 놀고 있다.`,
  },
};

const P05 = () => {
  return <EEL01C02A04P01 {...pageInfo} />;
};

export default P05;
