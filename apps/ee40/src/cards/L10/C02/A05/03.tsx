import EEL07C02A05P01, { IListenAndAnswer } from '@/Pages/EEL07C02A05P01';
import { getCorrectData, getDefaultData } from './pageData';

const P03 = () => {
  const data: IListenAndAnswer[] = [
    {
      type: 'A',
      color: '#E2F2FF',
      content: <>Is this your shirt?</>,
      audioSrc: '/L10/C02/A05/EE4-L10-C02-A05-P03-01.mp3',
    },
    {
      type: 'B',
      color: '#FFF0CC',
      content: <>Yes, it is.</>,
      audioSrc: '/L10/C02/A05/EE4-L10-C02-A05-P03-02.mp3',
    },
  ];

  return (
    <EEL07C02A05P01
      headerInfo={{
        headerText: 'Think and Talk',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: '사진을 보며 대화를 듣고, 말하기 버튼을 눌러 따라 말해 봅시다.',
      }}
      audioInfo={{
        audioSrc: '/L10/C02/A05/EE4-L10-C02-A05-P03.mp3',
        // captionSrc: '/L10/C02/A05/EE4-L10-C02-A05-P03.srt',
      }}
      data={data}
      mainKey={1}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      imageList={[
        {
          src: '/L10/C02/A05/EE4-L10-C02-A05-P03.jpg',
          alt: '두 벌의 드레스, 두 벌의 코트, 두 벌의 셔츠, 두 벌의 치마, 두 장의 스카프, 구두 한 짝이 있는 옷장, 그리고 파란색 셔츠와 빨간색 셔츠 중  파란색 셔츠를 가리키고 있는 화살표',
          title:
            '두 벌의 드레스, 두 벌의 코트, 두 벌의 셔츠, 두 벌의 치마, 두 장의 스카프, 구두 한 짝이 있는 옷장, 그리고 파란색 셔츠와 빨간색 셔츠 중  파란색 셔츠를 가리키고 있는 화살표',
        },
      ]}
    />
  );
};

export default P03;
