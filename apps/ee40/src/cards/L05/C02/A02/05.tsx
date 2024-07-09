import EEL01C02A04P01, { PageProps } from '@/Pages/EEL01C02A04P01';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Story 2',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '럭키는 농구하자는 제안을 왜 거절했나요?',
  },
  getCorrectData,
  getDefaultData,
  pageNumber: 5,
  mainKey: 5,
  subKey: 'TEXT-05',
  images: {
    src: '/L05/C02/A02/EE4-L05-C02-A02-P01.JPG',
    alt: `총 네 개의 장면으로 이루어진 만화.
첫 번째 장면: 농구 코트에서 두 명의 아이가 농구공을 가지고 이야기하고 있다. 한 아이는 'DANCE'라고 적힌 가방을 들고 있다.
두 번째 장면: 농구 코트에서 한 아이가 농구공을 들고 있고, 다른 두 아이는 그를 바라보고 있다.
세 번째 장면: 벤치에 앉아 있는 두 아이가 대화를 나누고 있다. 한 아이는 농구공을 가지고 있고, 다른 아이는 음료수를 마시고 있다.
네 번째 장면: 아이들이 배드민턴을 하고 있다. 한 아이가 네트 앞에서 셔틀콕을 치고 있고, 다른 아이는 뒤에서 준비하고 있다.`,
    title: `총 네 개의 장면으로 이루어진 만화.
첫 번째 장면: 농구 코트에서 두 명의 아이가 농구공을 가지고 이야기하고 있다. 한 아이는 'DANCE'라고 적힌 가방을 들고 있다.
두 번째 장면: 농구 코트에서 한 아이가 농구공을 들고 있고, 다른 두 아이는 그를 바라보고 있다.
세 번째 장면: 벤치에 앉아 있는 두 아이가 대화를 나누고 있다. 한 아이는 농구공을 가지고 있고, 다른 아이는 음료수를 마시고 있다.
네 번째 장면: 아이들이 배드민턴을 하고 있다. 한 아이가 네트 앞에서 셔틀콕을 치고 있고, 다른 아이는 뒤에서 준비하고 있다.`,
  },
};

const P05 = () => {
  return <EEL01C02A04P01 {...pageInfo} />;
};

export default P05;
