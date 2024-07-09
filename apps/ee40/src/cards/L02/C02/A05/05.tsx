import EEL01C02A05P01, { IListenAndAnswer } from '@/Pages/EEL01C02A05P01';
import { getCorrectData, getDefaultData, getSolutionData } from './pageData';

const P05 = () => {
  const data: IListenAndAnswer[] = [
    {
      type: '',
      color: '',
      content: <>This is my _____.</>,
      audioSrc: '',
    },
  ];

  return (
    <EEL01C02A05P01
      headerInfo={{
        headerText: 'Think and Talk',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: '가족 한 명을 그리고, 가족을 소개하는 말을 해 봅시다.',
      }}
      audioInfo={{
        audioSrc: '/L02/C02/A05/EE4-L02-C02-A05-P05.mp3',
        // captionSrc: '/L02/C02/A05/EE4-L02-C02-A05-P05.srt',
      }}
      data={data}
      mainKey={5}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      getSolutionData={getSolutionData}
      imageList={[
        {
          src: '/L02/C02/A05/EE4-L02-C02-A05-P05.jpg',
          alt: '나무에 열매처럼 걸려 있는 dad 사진, mom 사진, sister 사진, I 사진, brother 사진, 그리고 그 중 brother 사진이 더 큰 모습',
          title: '나무에 열매처럼 걸려 있는 dad 사진, mom 사진, sister 사진, I 사진, brother 사진, 그리고 그 중 brother 사진이 더 큰 모습',
        },
      ]}
    />
  );
};

export default P05;
