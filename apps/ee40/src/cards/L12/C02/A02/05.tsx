import EEL01C02A04P01, { PageProps } from '@/Pages/EEL01C02A04P01';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Story 2',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '럭키가 주말에 하는 활동은 무엇이었나요?',
  },
  getCorrectData,
  getDefaultData,
  pageNumber: 5,
  mainKey: 5,
  subKey: 'TEXT-01',
  images: {
    src: '/L12/C02/A02/EE4-L12-C02-A02-P05.png',
    alt: `세 개의 장면으로 이루어진 만화.
첫 번째 장면: 세 명의 아이들이 학급 게시판 앞에서 이야기하고 있다. 게시판에는 다양한 그림들이 그려져 있고, 아이들은 이를 가리키며 대화하고 있다.
두 번째 장면: 두 명의 아이들이 학급 게시판 앞에 서 있다. 한 아이가 공을 들고 있고, 다른 아이들은 그를 바라보고 있다.
세 번째 장면: 세 명의 아이들이 노란색 귀여운 캐릭터와 함께 있다. 노란색 귀여운 캐릭터가 축구공에 맞아 아파 하고 있고 아이들은 놀란 표정을 짓고 있다.`,
    title: `세 개의 장면으로 이루어진 만화.
첫 번째 장면: 세 명의 아이들이 학급 게시판 앞에서 이야기하고 있다. 게시판에는 다양한 그림들이 그려져 있고, 아이들은 이를 가리키며 대화하고 있다.
두 번째 장면: 두 명의 아이들이 학급 게시판 앞에 서 있다. 한 아이가 공을 들고 있고, 다른 아이들은 그를 바라보고 있다.
세 번째 장면: 세 명의 아이들이 노란색 귀여운 캐릭터와 함께 있다. 노란색 귀여운 캐릭터가 축구공에 맞아 아파 하고 있고 아이들은 놀란 표정을 짓고 있다.`,
  },
};

const P05 = () => {
  return <EEL01C02A04P01 {...pageInfo} />;
};

export default P05;
