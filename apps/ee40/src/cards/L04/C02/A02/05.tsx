import EEL01C02A04P01, { PageProps } from '@/Pages/EEL01C02A04P01';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Story 2',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '화재 안전 훈련에서 선생님이 무엇을 지시했나요?',
  },
  getCorrectData,
  getDefaultData,
  pageNumber: 5,
  mainKey: 5,
  subKey: 'TEXT-05',
  images: {
    src: '/L04/C02/A02/EE4-L04-C02-A02-P01.JPG',
    alt: `총 네 개의 장면으로 이루어진 만화.
첫 번째 장면: 한 남자와 노란색 귀여운 캐릭터가 신호등 앞에 서 있다. 신호등은 빨간 불이 켜져 있고, 남자가 멈추라는 신호를 하고 있다.
두 번째 장면: 불이 난 건물 앞에서 아이들과 노란색 캐릭터가 서 있다. 한 성인이 손가락으로 위를 가리키며 아이들에게 대피하라고 지시하고 있다. 아이들은 겁에 질려 있다.
세 번째 장면: 연기가 가득한 실내에서 노란색 캐릭터가 놀란 표정을 짓고 있다. 한 아이가 그를 따라가며 놀라고 있다.
네 번째 장면: 아이들이 안전모를 쓰고 줄을 서 있다. 한 성인이 아이들에게 무언가를 설명하고 있으며, 노란색 캐릭터도 함께 있다.`,
    title: `총 네 개의 장면으로 이루어진 만화.
첫 번째 장면: 한 남자와 노란색 귀여운 캐릭터가 신호등 앞에 서 있다. 신호등은 빨간 불이 켜져 있고, 남자가 멈추라는 신호를 하고 있다.
두 번째 장면: 불이 난 건물 앞에서 아이들과 노란색 캐릭터가 서 있다. 한 성인이 손가락으로 위를 가리키며 아이들에게 대피하라고 지시하고 있다. 아이들은 겁에 질려 있다.
세 번째 장면: 연기가 가득한 실내에서 노란색 캐릭터가 놀란 표정을 짓고 있다. 한 아이가 그를 따라가며 놀라고 있다.
네 번째 장면: 아이들이 안전모를 쓰고 줄을 서 있다. 한 성인이 아이들에게 무언가를 설명하고 있으며, 노란색 캐릭터도 함께 있다.`,
  },
};

const P05 = () => {
  return <EEL01C02A04P01 {...pageInfo} />;
};

export default P05;
