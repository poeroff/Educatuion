import { getCorrectData, getDefaultData } from './pageData';
import EEL07C03A06P01 from '@/Pages/EEL07C03A06P01';

const P02 = () => {
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
          src: '/L07/C03/A06/EE4-L07-C03-A06-P02.JPG',
          alt: '학교 건물',
          title: '학교 건물',
        },
      ]}
      pageData={{
        pageNumber: 2,
        mainKey: 2,
        subKey: 'TEXT-02',
        getDefaultData: getDefaultData,
        getCorrectData: getCorrectData,
        data: [{ content: 'time for _______' }],
      }}
    />
  );
};

export default P02;
