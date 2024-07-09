import EEL01C02A04P01, { PageProps } from '@/Pages/EEL01C02A04P01';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Story 2',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '친구들은 무슨 운동을 하고 있나요?',
  },
  getCorrectData,
  getDefaultData,
  pageNumber: 1,
  mainKey: 1,
  subKey: 'TEXT-01',
  images: {
    src: '/L05/C02/A02/EE4-L05-C02-A02-P01.JPG',
    alt: `총 네 개의 장면으로 이루어진 만화.
첫 번째 장면: 농구 코트 앞에서 두 명의 아이가 농구공을 가지고 이야기하고 있다. 한 아이는 'DANCE'라고 적힌 가방을 들고 있다.
두 번째 장면: 농구 코트 앞에서 한 아이가 농구공을 들고 있고, 다른 두 아이는 그를 바라보고 이야기를 나누고 있다.
세 번째 장면: 벤치에 남자아이 한명과 여자아이 한 명이 앉아 있고 남자아이는 난감해 하고 있다. 그 앞에 배드민턴 채와 공을 양 손에 각각 들고 있는 여자아이가 서서 말하고 있고 남자아이가 허리에 손을 올리고 벤치 옆에 서 있다.
네 번째 장면: 네 명의 아이들이 배드민턴을 하고 있다. 한 아이가 네트 앞에서 셔틀콕을 치고 있고, 다른 아이는 뒤에서 준비하고 있다.`,
    title: `총 네 개의 장면으로 이루어진 만화.
첫 번째 장면: 농구 코트 앞에서 두 명의 아이가 농구공을 가지고 이야기하고 있다. 한 아이는 'DANCE'라고 적힌 가방을 들고 있다.
두 번째 장면: 농구 코트 앞에서 한 아이가 농구공을 들고 있고, 다른 두 아이는 그를 바라보고 이야기를 나누고 있다.
세 번째 장면: 벤치에 남자아이 한명과 여자아이 한 명이 앉아 있고 남자아이는 난감해 하고 있다. 그 앞에 배드민턴 채와 공을 양 손에 각각 들고 있는 여자아이가 서서 말하고 있고 남자아이가 허리에 손을 올리고 벤치 옆에 서 있다.
네 번째 장면: 네 명의 아이들이 배드민턴을 하고 있다. 한 아이가 네트 앞에서 셔틀콕을 치고 있고, 다른 아이는 뒤에서 준비하고 있다.`,
  },
};

const P01 = () => {
  return <EEL01C02A04P01 {...pageInfo} />;
};

export default P01;
