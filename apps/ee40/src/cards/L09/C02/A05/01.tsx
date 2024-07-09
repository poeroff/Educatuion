import EEL07C02A05P01, { IListenAndAnswer } from '@/Pages/EEL07C02A05P01';
import { getCorrectData, getDefaultData } from './pageData';

const P01 = () => {
  const data: IListenAndAnswer[] = [
    {
      type: 'A',
      color: '#E2F2FF',
      content: <>Where is my brush?</>,
      audioSrc: '/L09/C02/A05/EE4-L09-C02-A05-P01-01.mp3',
    },
    {
      type: 'B',
      color: '#FFF0CC',
      content: <>It’s in the basket.</>,
      audioSrc: '/L09/C02/A05/EE4-L09-C02-A05-P01-02.mp3',
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
        audioSrc: '/L09/C02/A05/EE4-L09-C02-A05-P01.mp3',
        // captionSrc: '/L09/C02/A05/EE4-L09-C02-A05-P01.srt',
      }}
      data={data}
      mainKey={1}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      imageList={[
        {
          src: '/L09/C02/A05/EE4-L09-C02-A05-P01.jpg',
          alt: '여러 가구가 놓여 있는 방 안 벽걸이 선반 위에 바구니 안에 놓여 있는 붓, 이 붓을 가리키는 화살표',
          title: '여러 가구가 놓여 있는 방 안 벽걸이 선반 위에 바구니 안에 놓여 있는 붓, 이 붓을 가리키는 화살표',
        },
      ]}
    />
  );
};

export default P01;
