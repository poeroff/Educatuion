import EEL01C02A04P01, { PageProps } from '@/Pages/EEL01C02A04P01';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Story 2',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '이야기 속 오늘은 무슨 요일이었나요?',
  },
  getCorrectData,
  getDefaultData,
  pageNumber: 5,
  mainKey: 5,
  subKey: 'TEXT-05',
  images: {
    src: '/L11/C02/A02/EE4-L11-C02-A02-P01.JPG',
    alt: `네 개의 장면으로 이루어진 만화.
첫 번째 장면: 한 아이가 책상에 앉아 계획표를 보고 있다. 계획표에는 월요일부터 금요일까지의 일정이 그려져 있다. 아이는 가방을 싸고 있으며, 옆에는 펭귄모양의 기계가  있다.
두 번째 장면: 두 아이가 학교 급식실에서 식단표를 보고 있다. 식단표에는 월요일부터 금요일까지의 식단이 표시되어 있다.
세 번째 장면: 세 명의 아이들이 점심 식사를 하고 있다. 한 아이는 축구공을 생각하고 있고, 다른 아이는 요리사 모자와 국자를 생각하고 있다.
네 번째 장면: 두 아이가 주방에서 쿠키를 굽고 있다. 한 아이는 쿠키를 오븐에서 꺼내고 있고, 다른 아이는 케이크를 꾸미고 있다. 옆에 즐겁게 춤추는 사람이 있다.`,
    title: `네 개의 장면으로 이루어진 만화.
첫 번째 장면: 한 아이가 책상에 앉아 계획표를 보고 있다. 계획표에는 월요일부터 금요일까지의 일정이 그려져 있다. 아이는 가방을 싸고 있으며, 옆에는 펭귄모양의 기계가  있다.
두 번째 장면: 두 아이가 학교 급식실에서 식단표를 보고 있다. 식단표에는 월요일부터 금요일까지의 식단이 표시되어 있다.
세 번째 장면: 세 명의 아이들이 점심 식사를 하고 있다. 한 아이는 축구공을 생각하고 있고, 다른 아이는 요리사 모자와 국자를 생각하고 있다.
네 번째 장면: 두 아이가 주방에서 쿠키를 굽고 있다. 한 아이는 쿠키를 오븐에서 꺼내고 있고, 다른 아이는 케이크를 꾸미고 있다. 옆에 즐겁게 춤추는 사람이 있다.`,
  },
};

const P05 = () => {
  return <EEL01C02A04P01 {...pageInfo} />;
};

export default P05;
