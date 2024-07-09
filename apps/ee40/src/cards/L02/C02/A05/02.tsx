import EEL01C02A05P01, { IListenAndAnswer } from '@/Pages/EEL01C02A05P01';
import { getCorrectData, getDefaultData } from './pageData';

const P02 = () => {
  const data: IListenAndAnswer[] = [
    {
      type: '',
      color: '',
      content: <>This is my mom.</>,
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
        text: '사진을 보며 문장을 듣고, 말하기 버튼을 눌러 따라 말해 봅시다.',
      }}
      audioInfo={{
        audioSrc: '/L02/C02/A05/EE4-L02-C02-A05-P02.mp3',
        // captionSrc: '/L02/C02/A05/EE4-L02-C02-A05-P02.srt',
      }}
      data={data}
      mainKey={2}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      imageList={[
        {
          src: '/L02/C02/A05/EE4-L02-C02-A05-P02.jpg',
          alt: '나무에 열매처럼 걸려 있는 dad 사진, mom 사진, sister 사진, I 사진, brother 사진, 그리고 그 중 mom 사진이 더 큰 모습',
          title: '나무에 열매처럼 걸려 있는 dad 사진, mom 사진, sister 사진, I 사진, brother 사진, 그리고 그 중 mom 사진이 더 큰 모습',
        },
      ]}
    />
  );
};

export default P02;
