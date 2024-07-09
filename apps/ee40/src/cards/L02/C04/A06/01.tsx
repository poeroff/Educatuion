import { getCorrectData, getDefaultData } from './pageData';
import EEL02C06A06P01 from '@/Pages/EEL02C06A06P01';

const P01 = () => {
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
          imgNum: 1,
          src: '/L02/C04/A06/EE4-L02-C04-A06-P01.JPG',
          alt: '엄마 얼굴 그림',
          title: '엄마 얼굴 그림',
        },
      ]}
      pageData={{
        pageNumber: 1,
        mainKey: 1,
        subKey: 'TEXT-01',
        getDefaultData: getDefaultData,
        getCorrectData: getCorrectData,
        data: [{ content: 'm _______' }],
      }}
    />
  );
};

export default P01;
