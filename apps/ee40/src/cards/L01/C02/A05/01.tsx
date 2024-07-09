import EEL01C02A05P01, { IListenAndAnswer } from '@/Pages/EEL01C02A05P01';
import { getCorrectData, getDefaultData } from './pageData';

const P01 = () => {
  const data: IListenAndAnswer[] = [
    {
      type: 'A',
      color: '#E2F2FF',
      content: (
        <>
          Good morning.
          <br />
          How are you?
        </>
      ),
      audioSrc: '/L01/C02/A05/EE4-L01-C02-A05-P01-01.mp3',
    },
    {
      type: 'B',
      color: '#FFF0CC',
      content: <>I’m great.</>,
      audioSrc: '/L01/C02/A05/EE4-L01-C02-A05-P01-02.mp3',
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
        audioSrc: '/L01/C02/A05/EE4-L01-C02-A05-P01.mp3',
        // captionSrc: '/L01/C02/A05/EE4-L01-C02-A05-P02.srt',
      }}
      data={data}
      mainKey={1}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      imageList={[
        {
          src: '/L01/C02/A05/EE4-L01-C02-A05-P01.png',
          alt: '아침 7시에 여자아이가 기지개를 펴고 활짝 웃으며 일어나는 모습',
          title: '아침 7시에 여자아이가 기지개를 펴고 활짝 웃으며 일어나는 모습',
        },
      ]}
    />
  );
};

export default P01;
