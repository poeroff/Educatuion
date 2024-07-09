import { getCorrectData, getDefaultData } from './pageData';
import EE40L01C01A05P01 from '@/Pages/EEL01C01A05P01';

const P01 = () => {
  return (
    <EE40L01C01A05P01
      layout={{
        headerInfo: {
          headerText: 'Story 1',
          headerPattern: 'text' as const,
        },
        questionInfo: {
          text: '그림 속 수호와 엘라의 표정은 어떤가요?',
        },
      }}
      imgArr={[
        {
          src: '/L01/C01/A05/EE4-L01-C01-A05-P01.jpg',
          alt: '교실에서 아이들이 인사를 나누고 있고, 수호와 엘라도 웃으며 서로에게 인사하고 있는 모습',
          title: '교실에서 아이들이 인사를 나누고 있고, 수호와 엘라도 웃으며 서로에게 인사하고 있는 모습',
        },
      ]}
      pageData={{
        pageNumber: 1,
        mainKey: 1,
        subKey: 'TEXT-01',
        getDefaultData: getDefaultData,
        getCorrectData: getCorrectData,
      }}
    />
  );
};

export default P01;
