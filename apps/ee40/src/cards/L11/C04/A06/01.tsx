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
          text: '거울에 비친 낱말을 바르게 쓰고 요일을 말해 봅시다.',
        },
      }}
      imgArr={[
        {
          imgNum: 1,
          src: '/L11/C04/A06/EE4-L11-C04-A06-P01.JPG',
          alt: '‘Monday’ 라는 글자가 거울에 비친 그림',
          title: '‘Monday’ 라는 글자가 거울에 비친 그림',
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
