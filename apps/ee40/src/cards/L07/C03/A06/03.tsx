import { getCorrectData, getDefaultData } from './pageData';
import EEL07C03A06P01 from '@/Pages/EEL07C03A06P01';

const P03 = () => {
  return (
    <EEL07C03A06P01
      layout={{
        headerInfo: {
          headerText: 'Words and Sentences 2',
          headerPattern: 'text' as const,
        },
        questionInfo: {
          text: '그림을 보고 빈칸에 알맞은 낱말을 써 봅시다.',
        },
      }}
      imgArr={[
        {
          src: '/L07/C03/A06/EE4-L07-C03-A06-P03.JPG',
          alt: '이불이 깔려 있는 침대',
          title: '이불이 깔려 있는 침대',
        },
      ]}
      pageData={{
        pageNumber: 3,
        mainKey: 3,
        subKey: 'TEXT-03',
        getDefaultData: getDefaultData,
        getCorrectData: getCorrectData,
        data: [{ content: 'time for _______' }],
      }}
    />
  );
};

export default P03;
