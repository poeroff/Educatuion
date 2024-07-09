import EEL07C02A05P01, { IListenAndAnswer } from '@/Pages/EEL07C02A05P01';
import { getCorrectData, getDefaultData } from './pageData';

const P06 = () => {
  const data: IListenAndAnswer[] = [
    {
      type: 'A',
      color: '#E2F2FF',
      content: <>Is this your scarf?</>,
      audioSrc: '/L10/C02/A05/EE4-L10-C02-A05-P06-01.mp3',
    },
    {
      type: 'B',
      color: '#FFF0CC',
      content: (
        <>
          No, it isn’t.
          <br />
          My scarf is short.
        </>
      ),
      audioSrc: '/L10/C02/A05/EE4-L10-C02-A05-P06-02.mp3',
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
        audioSrc: '/L10/C02/A05/EE4-L10-C02-A05-P06.mp3',
        // captionSrc: '/L10/C02/A05/EE4-L10-C02-A05-P06.srt',
      }}
      data={data}
      mainKey={1}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      imageList={[
        {
          src: '/L10/C02/A05/EE4-L10-C02-A05-P06.jpg',
          alt: '두 벌의 드레스, 두 벌의 코트, 두 벌의 셔츠, 두 벌의 치마, 두 장의 스카프, 구두 한 짝이 있는 옷장, 그리고 길이가 다른 두 장의 스카프 중 길이가 긴 스카프를 가리키고 있는 화살표',
          title:
            '두 벌의 드레스, 두 벌의 코트, 두 벌의 셔츠, 두 벌의 치마, 두 장의 스카프, 구두 한 짝이 있는 옷장, 그리고 길이가 다른 두 장의 스카프 중 길이가 긴 스카프를 가리키고 있는 화살표',
        },
      ]}
    />
  );
};

export default P06;
