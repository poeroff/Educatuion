import EEL07C02A05P01, { IListenAndAnswer } from '@/Pages/EEL07C02A05P01';
import { getCorrectData, getDefaultData } from './pageData';

const P01 = () => {
  const data: IListenAndAnswer[] = [
    {
      type: 'A',
      color: '#E2F2FF',
      content: <>What time is it?</>,
      audioSrc: '/L07/C02/A05/EE4-L07-C02-A05-P01-01.mp3',
    },
    {
      type: 'B',
      color: '#FFF0CC',
      content: (
        <>
          It’s 7 o’clock.
          <br />
          It’s time for breakfast.
        </>
      ),
      audioSrc: '/L07/C02/A05/EE4-L07-C02-A05-P01-02.mp3',
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
        audioSrc: '/L07/C02/A05/EE4-L07-C02-A05-P01.mp3',
        // captionSrc: '/L07/C02/A05/EE4-L07-C02-A05-P01.srt',
      }}
      data={data}
      mainKey={1}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      imageList={[
        {
          src: '/L07/C02/A05/EE4-L07-C02-A05-P01.jpg',
          alt: '아침 식사를 하고 있는 남자아이',
          title: '아침 식사를 하고 있는 남자아이',
        },
      ]}
    />
  );
};

export default P01;
