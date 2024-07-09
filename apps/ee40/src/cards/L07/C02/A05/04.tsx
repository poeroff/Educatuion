import EEL07C02A05P01, { IListenAndAnswer } from '@/Pages/EEL07C02A05P01';
import { getCorrectData, getDefaultData } from './pageData';

const P04 = () => {
  const data: IListenAndAnswer[] = [
    {
      type: 'A',
      color: '#E2F2FF',
      content: <>What time is it?</>,
      audioSrc: '/L07/C02/A05/EE4-L07-C02-A05-P04-01.mp3',
    },
    {
      type: 'B',
      color: '#FFF0CC',
      content: (
        <>
          It’s 6 o’clock.
          <br />
          It’s time for dinner.
        </>
      ),
      audioSrc: '/L07/C02/A05/EE4-L07-C02-A05-P04-02.mp3',
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
        audioSrc: '/L07/C02/A05/EE4-L07-C02-A05-P04.mp3',
        // captionSrc: '/L07/C02/A05/EE4-L07-C02-A05-P04.srt',
      }}
      data={data}
      mainKey={1}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      imageList={[
        {
          src: '/L07/C02/A05/EE4-L07-C02-A05-P04.jpg',
          alt: '저녁에 집에서 저녁 식사를 하고 있는 할아버지, 할머니, 여자아이',
          title: '저녁에 집에서 저녁 식사를 하고 있는 할아버지, 할머니, 여자아이',
        },
      ]}
    />
  );
};

export default P04;
