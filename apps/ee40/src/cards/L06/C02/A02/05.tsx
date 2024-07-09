import EEL01C02A04P01, { PageProps } from '@/Pages/EEL01C02A04P01';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Story 2',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '수호는 민지가 불렀을 때 무엇을 하고 있었나요?',
  },
  getCorrectData,
  getDefaultData,
  pageNumber: 5,
  mainKey: 5,
  subKey: 'TEXT-05',
  images: {
    src: '/L06/C02/A02/EE4-L06-C02-A02-P01.JPG',
    alt: `네 개의 장면으로 이루어진 만화.
첫 번째 장면: 두 명의 아이가 공원에서 걷고 있다. 노란색 귀여운 캐릭터가 하늘을 날며 그들을 따라가고 있다. 아이들 중 한 명이 건너편에서 벽화를 그리고 있는 여자아이를 가리키고 있다.
두 번째 장면: 세 명의 아이가 벽화 앞에서 대화하고 있다. 
세 번째 장면: 한 아이가 벽에 그림을 그리고 있다. 노란색 캐릭터가 그 옆에 떠 있다. 다른 아이는 멀리 벤치에 앉아있는 남자 아이를 향해두 손을 번쩍 들고 있다.
네 번째 장면: 네 명의 아이들이 벽화 앞에서 즐겁게 춤을 추고 있다. 노란색 캐릭터가 음악에 맞춰 춤추고 있다. 벽에는 무지개와 꽃 그림이 그려져 있다.`,
    title: `네 개의 장면으로 이루어진 만화.
첫 번째 장면: 두 명의 아이가 공원에서 걷고 있다. 노란색 귀여운 캐릭터가 하늘을 날며 그들을 따라가고 있다. 아이들 중 한 명이 건너편에서 벽화를 그리고 있는 여자아이를 가리키고 있다.
두 번째 장면: 세 명의 아이가 벽화 앞에서 대화하고 있다. 
세 번째 장면: 한 아이가 벽에 그림을 그리고 있다. 노란색 캐릭터가 그 옆에 떠 있다. 다른 아이는 멀리 벤치에 앉아있는 남자 아이를 향해두 손을 번쩍 들고 있다.
네 번째 장면: 네 명의 아이들이 벽화 앞에서 즐겁게 춤을 추고 있다. 노란색 캐릭터가 음악에 맞춰 춤추고 있다. 벽에는 무지개와 꽃 그림이 그려져 있다.`,
  },
};

const P05 = () => {
  return <EEL01C02A04P01 {...pageInfo} />;
};

export default P05;
