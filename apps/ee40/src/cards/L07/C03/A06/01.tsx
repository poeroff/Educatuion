import { getCorrectData, getDefaultData } from './pageData';
import EEL07C03A06P01 from '@/Pages/EEL07C03A06P01';

const P01 = () => {
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
          src: '/L07/C03/A06/EE4-L07-C03-A06-P01.JPG',
          alt: '오후 12시 30분 을 가리키고 있는 시계와 그릇 위에 올려진 음식들',
          title: '오후 12시 30분 을 가리키고 있는 시계와 그릇 위에 올려진 음식들',
        },
      ]}
      pageData={{
        pageNumber: 1,
        mainKey: 1,
        subKey: 'TEXT-01',
        getDefaultData: getDefaultData,
        getCorrectData: getCorrectData,
        data: [{ content: 'time for _______' }],
      }}
    />
  );
};

export default P01;
