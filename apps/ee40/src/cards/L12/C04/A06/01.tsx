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
          text: '사진을 보고, 알맞은 어구를 쓴 후 말해 봅시다.',
        },
      }}
      imgArr={[
        {
          imgNum: 1,
          src: '/L12/C04/A06/EE4-L12-C04-A06-P01.jpg',
          alt: '여자 아이가 보호장비를 하고 네발 자전거를 타고 있다',
          title: '여자 아이가 보호장비를 하고 네발 자전거를 타고 있다',
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
