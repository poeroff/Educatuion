import EEL01C02A05P01, { IListenAndAnswer } from '@/Pages/EEL01C02A05P01';
import { getCorrectData, getDefaultData } from './pageData';

const P02 = () => {
  const data: IListenAndAnswer[] = [
    {
      type: 'A',
      color: '#E2F2FF',
      content: (
        <>
          Good afternoon.
          <br />
          How are you?
        </>
      ),
      audioSrc: '/L01/C02/A05/EE4-L01-C02-A05-P02-01.mp3',
    },
    {
      type: 'B',
      color: '#FFF0CC',
      content: <>I’m good.</>,
      audioSrc: '/L01/C02/A05/EE4-L01-C02-A05-P02-02.mp3',
    },
  ];

  return (
    <EEL01C02A05P01
      headerInfo={{
        headerText: 'Think and Talk',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: '사진을 보며 대화를 듣고, 말하기 버튼을 눌러 따라 말해 봅시다.',
      }}
      audioInfo={{
        audioSrc: '/L01/C02/A05/EE4-L01-C02-A05-P02.mp3',
        // captionSrc: '/L01/C02/A05/EE4-L01-C02-A05-P02.srt',
      }}
      data={data}
      mainKey={2}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      imageList={[
        {
          src: '/L01/C02/A05/EE4-L01-C02-A05-P02.png',
          alt: '낮 12시에 여자아이가 웃으며 밥을 먹고 있는 모습',
          title: '낮 12시에 여자아이가 웃으며 밥을 먹고 있는 모습',
        },
      ]}
    />
  );
};

export default P02;
