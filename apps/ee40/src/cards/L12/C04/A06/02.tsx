import { getCorrectData, getDefaultData } from './pageData';
import EEL11C04A06P01 from '@/Pages/EEL11C04A06P01';

const P02 = () => {
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
          imgNum: 2,
          src: '/L12/C04/A06/EE4-L12-C04-A06-P02.jpg',
          alt: '한 사람이 개 와 함께 눈 내리는 거리를 걷고 있다.',
          title: '한 사람이 개 와 함께 눈 내리는 거리를 걷고 있다.',
        },
      ]}
      pageData={{
        pageNumber: 2,
        mainKey: 2,
        subKey: 'TEXT-01',
        getDefaultData: getDefaultData,
        getCorrectData: getCorrectData,
      }}
    />
  );
};

export default P02;
