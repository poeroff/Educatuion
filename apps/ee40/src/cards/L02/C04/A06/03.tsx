import { getCorrectData, getDefaultData } from './pageData';
import EEL02C06A06P01 from '@/Pages/EEL02C06A06P01';

const P03 = () => {
  return (
    <EEL02C06A06P01
      layout={{
        headerInfo: {
          headerText: 'Review 3',
          headerPattern: 'text' as const,
        },
        questionInfo: {
          text: '그림을 보고, 완성된 낱말을 쓰고 말 해 봅시다.',
        },
      }}
      imgArr={[
        {
          imgNum: 3,
          src: '/L02/C04/A06/EE4-L02-C04-A06-P03.JPG',
          alt: '남자 아이 얼굴 그림',
          title: '남자 아이 얼굴 그림',
        },
      ]}
      pageData={{
        pageNumber: 3,
        mainKey: 3,
        subKey: 'TEXT-01',
        getDefaultData: getDefaultData,
        getCorrectData: getCorrectData,
        data: [{ content: 'b _______' }],
      }}
    />
  );
};

export default P03;
