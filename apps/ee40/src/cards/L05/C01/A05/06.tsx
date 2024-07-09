import { getCorrectData, getDefaultData } from './pageData';
import EE40L01C01A05P01 from '@/Pages/EEL01C01A05P01';

const P06 = () => {
  return (
    <EE40L01C01A05P01
      layout={{
        headerInfo: {
          headerText: 'Story 1',
          headerPattern: 'text' as const,
        },
        questionInfo: {
          text: '축구를 하자고 제안한 친구들은 누구였나요?',
        },
      }}
      imgArr={[
        {
          src: '/L05/C01/A05/EE4-L05-C01-A05-P01.png',
          alt: '여자아이(엘라)와 남자아이(앤디), 그리고 올리가 캠핑장의 축구장에 있는 모습',
          title: '여자아이(엘라)와 남자아이(앤디), 그리고 올리가 캠핑장의 축구장에 있는 모습',
        },
      ]}
      pageData={{
        pageNumber: 6,
        mainKey: 6,
        subKey: 'TEXT-01',
        getDefaultData: getDefaultData,
        getCorrectData: getCorrectData,
      }}
    />
  );
};

export default P06;
