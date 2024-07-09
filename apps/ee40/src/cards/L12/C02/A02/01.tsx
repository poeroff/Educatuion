import EEL01C02A04P01, { PageProps } from '@/Pages/EEL01C02A04P01';
import { getCorrectData, getDefaultData } from './pageData';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Story 2',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '학급 게시판에 무슨 활동이 보이나요?',
  },
  getCorrectData,
  getDefaultData,
  pageNumber: 1,
  mainKey: 1,
  subKey: 'TEXT-01',
  images: {
    src: '/L12/C02/A02/EE4-L12-C02-A02-P01.JPG',
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

const P01 = () => {
  return <EEL01C02A04P01 {...pageInfo} />;
};

export default P01;
