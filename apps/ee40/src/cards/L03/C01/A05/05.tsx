import { getCorrectData, getDefaultData } from './pageData';
import EE40L01C01A05P01 from '@/Pages/EEL01C01A05P01';

const P05 = () => {
  return (
    <EE40L01C01A05P01
      layout={{
        headerInfo: {
          headerText: 'Story 1',
          headerPattern: 'text' as const,
        },
        questionInfo: {
          text: '카밀라의 영상 속 남자아이는 누구였나요?',
        },
      }}
      imgArr={[
        {
          src: ['/L03/C01/A05/EE4-L03-C01-A05-P01-01.jpg', '/L03/C01/A05/EE4-L03-C01-A05-P01-02.jpg'],
          alt: '남자아이(럭키)가 교실 앞에 나와 요가하는 영상을 친구들에게 소개하는 모습',
          title: '남자아이(럭키)가 교실 앞에 나와 요가하는 영상을 친구들에게 소개하는 모습',
        },
      ]}
      pageData={{
        pageNumber: 5,
        mainKey: 5,
        subKey: 'TEXT-01',
        getDefaultData: getDefaultData,
        getCorrectData: getCorrectData,
      }}
    />
  );
};

export default P05;
