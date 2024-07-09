import EEL07C02A05P01, { IListenAndAnswer } from '@/Pages/EEL07C02A05P01';
import { getCorrectData, getDefaultData } from './pageData';

const P03 = () => {
  const data: IListenAndAnswer[] = [
    {
      type: 'A',
      color: '#E2F2FF',
      content: <>What time is it?</>,
      audioSrc: '/L07/C02/A05/EE4-L07-C02-A05-P03-01.mp3',
    },
    {
      type: 'B',
      color: '#FFF0CC',
      content: (
        <>
          It’s 12:30.
          <br />
          It’s time for lunch.
        </>
      ),
      audioSrc: '/L07/C02/A05/EE4-L07-C02-A05-P03-02.mp3',
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
        audioSrc: '/L07/C02/A05/EE4-L07-C02-A05-P03.mp3',
        // captionSrc: '/L07/C02/A05/EE4-L07-C02-A05-P03.srt',
      }}
      data={data}
      mainKey={1}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      imageList={[
        {
          src: '/L07/C02/A05/EE4-L07-C02-A05-P03.jpg',
          alt: '급식판에 담긴 음식을 먹는 아이들',
          title: '급식판에 담긴 음식을 먹는 아이들',
        },
      ]}
    />
  );
};

export default P03;
