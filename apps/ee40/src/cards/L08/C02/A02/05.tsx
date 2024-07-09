import EEL01C02A04P01, { PageProps } from '@/Pages/EEL01C02A04P01';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Story 2',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '야구 글러브는 얼마였나요?',
  },
  getCorrectData,
  getDefaultData,
  pageNumber: 5,
  mainKey: 5,
  subKey: 'TEXT-05',
  images: {
    src: '/L08/C02/A02/EE4-L08-C02-A02-P01.JPG',
    alt: `네 개의 장면으로 이루어진 만화.
첫 번째 장면: 한 여자아이와 남자아이가 상점에서 물건을 고르고 있다. 남자아이가 손목시계를 들고 있다.
두 번째 장면: 여자아이가 계산대에서 손목시계를 스캐너에 찍고 있다. 가격은 5,000원이 표시되어 있다. 남자아이는 그 옆에서 지켜보고 있다.
세 번째 장면: 상점에서 할아버지와 야구글러브를 낀 여자 아이가 이야기를 나누고 있고 뒤에 다른 여자 아이가 서 있다. 상점에는 스포츠 용품이 진열 되어 있다.
네 번째 장면: 여자 아이 두명이 계산대에서 야구 글러브를 계산하고 있다. 할아버지와 남자 아이는 옆에 서 있다.`,
    title: `네 개의 장면으로 이루어진 만화.
첫 번째 장면: 한 여자아이와 남자아이가 상점에서 물건을 고르고 있다. 남자아이가 손목시계를 들고 있다.
두 번째 장면: 여자아이가 계산대에서 손목시계를 스캐너에 찍고 있다. 가격은 5,000원이 표시되어 있다. 남자아이는 그 옆에서 지켜보고 있다.
세 번째 장면: 상점에서 할아버지와 야구글러브를 낀 여자 아이가 이야기를 나누고 있고 뒤에 다른 여자 아이가 서 있다. 상점에는 스포츠 용품이 진열 되어 있다.
네 번째 장면: 여자 아이 두명이 계산대에서 야구 글러브를 계산하고 있다. 할아버지와 남자 아이는 옆에 서 있다.`,
  },
};

const P05 = () => {
  return <EEL01C02A04P01 {...pageInfo} />;
};

export default P05;
