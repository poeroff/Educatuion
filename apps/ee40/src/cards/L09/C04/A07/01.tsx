import { getCorrectData, getDefaultData } from './pageData';
import EEL11C04A06P01 from '@/Pages/EEL11C04A06P01';

const P01 = () => {
  return (
    <EEL11C04A06P01
      layout={{
        headerInfo: {
          headerText: 'Review 3',
          headerPattern: 'text' as const,
        },
        questionInfo: {
          text: '내가 공주라면 시계를 어디에 둘지 그 위치와 이유를 말해 봅시다.',
        },
      }}
      imgArr={[
        {
          src: '/L09/C04/A07/EE4-L09-C04-A07-P01.JPG',
          alt: '사진 위에 공주가 ‘where is my watch?’라고 묻고 있다. 사진은 방이 핑크색으로 꾸며져 있고 책상, 의자, 침대, 선반 등이 있다.',
          title: '사진 위에 공주가 ‘where is my watch?’라고 묻고 있다. 사진은 방이 핑크색으로 꾸며져 있고 책상, 의자, 침대, 선반 등이 있다.',
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
