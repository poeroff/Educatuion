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
          text: '친구들은 무슨 옷을 입고 있나요?',
        },
      }}
      imgArr={[
        {
          src: '/L02/C01/A05/EE4-L02-C01-A05-P01-01.jpg',
          alt: '한복을 입고 있는 남자아이(수호)가 인도 전통 의상을 입고 있는 남자아이(럭키)의 부모님에게 인사하고 있는 모습',
          title: '한복을 입고 있는 남자아이(수호)가 인도 전통 의상을 입고 있는 남자아이(럭키)의 부모님에게 인사하고 있는 모습',
        },
        {
          src: '/L02/C01/A05/EE4-L02-C01-A05-P01-02.jpg',
          alt: '멕시코 전통 의상을 입고 있는 남자아이와 한복을 입고 있는 여자아이(수진)가 팽이놀이를 하고 있는 모습)',
          title: '멕시코 전통 의상을 입고 있는 남자아이와 한복을 입고 있는 여자아이(수진)가 팽이놀이를 하고 있는 모습)',
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
