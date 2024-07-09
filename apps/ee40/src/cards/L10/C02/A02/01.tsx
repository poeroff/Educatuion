import EEL01C02A04P01, { PageProps } from '@/Pages/EEL01C02A04P01';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Story 2',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '친구들은 무엇을 준비하고 있나요?',
  },
  getCorrectData,
  getDefaultData,
  pageNumber: 1,
  mainKey: 1,
  subKey: 'TEXT-01',
  images: {
    src: '/L10/C02/A02/EE4-L10-C02-A02-P01.JPG',
    alt: `네 개의 장면으로 이루어진 만화.
첫 번째 장면: 한 여자아이가 마녀 모자를 쓰고 다른 여자 아이에게 옷을 보여주고 있다. 바닥에는 여러 가지 의상이 널려 있다.
두 번째 장면: 같은 아이가 녹색 코트를 들고 있고, 남자 아이는 그것을 보며 어리둥절한 표정을 짓고 있다. 남자아이는 빨간색 옷을 생각하고 있다.
세 번째 장면: 같은 아이가 다른 여자아이에게 노란색 옷을 보여주고 있다. 여자아이는 한 손을 들고 고개를 젓고 있다. 
네 번째 장면: 여러 명의 아이들이 다양한 의상을 입고 무대 위에서 한 손을 들어올리며 힘차게 공연할 준비를 하고 있다.`,
    title: `네 개의 장면으로 이루어진 만화.
첫 번째 장면: 한 여자아이가 마녀 모자를 쓰고 다른 여자 아이에게 옷을 보여주고 있다. 바닥에는 여러 가지 의상이 널려 있다.
두 번째 장면: 같은 아이가 녹색 코트를 들고 있고, 남자 아이는 그것을 보며 어리둥절한 표정을 짓고 있다. 남자아이는 빨간색 옷을 생각하고 있다.
세 번째 장면: 같은 아이가 다른 여자아이에게 노란색 옷을 보여주고 있다. 여자아이는 한 손을 들고 고개를 젓고 있다. 
네 번째 장면: 여러 명의 아이들이 다양한 의상을 입고 무대 위에서 한 손을 들어올리며 힘차게 공연할 준비를 하고 있다.`,
  },
};
const P01 = () => {
  return <EEL01C02A04P01 {...pageInfo} />;
};

export default P01;
