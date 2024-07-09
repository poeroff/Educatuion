import EEL07C02A05P01, { IListenAndAnswer } from '@/Pages/EEL07C02A05P01';
import { getCorrectData, getDefaultData } from './pageData';

const P02 = () => {
  const data: IListenAndAnswer[] = [
    {
      type: 'A',
      color: '#E2F2FF',
      content: <>Who is she?</>,
      audioSrc: '/L03/C02/A05/EE4-L03-C02-A05-P02-01.mp3',
    },
    {
      type: 'B',
      color: '#FFF0CC',
      content: <>She’s my grandma.</>,
      audioSrc: '/L03/C02/A05/EE4-L03-C02-A05-P02-02.mp3',
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
        audioSrc: '/L03/C02/A05/EE4-L03-C02-A05-P02.mp3',
        // captionSrc: '/L03/C02/A05/EE4-L03-C02-A05-P02.srt',
      }}
      data={data}
      mainKey={2}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      imageList={[
        {
          src: '/L03/C02/A05/EE4-L03-C02-A05-P02.jpg',
          alt: '할아버지, 할머니, 선생님과 친구의 사진이 붙여 있는 다이어리, 할머니 사진에 표시가 되어 있는 모습',
          title: '할아버지, 할머니, 선생님과 친구의 사진이 붙여 있는 다이어리, 할머니 사진에 표시가 되어 있는 모습',
        },
      ]}
    />
  );
};

export default P02;
