import EEL07C02A05P01, { IListenAndAnswer } from '@/Pages/EEL07C02A05P01';
import { getCorrectData, getDefaultData } from './pageData';

const P05 = () => {
  const data: IListenAndAnswer[] = [
    {
      type: 'A',
      color: '#E2F2FF',
      content: <>Where is my watch?</>,
      audioSrc: '/L09/C02/A05/EE4-L09-C02-A05-P05-01.mp3',
    },
    {
      type: 'B',
      color: '#FFF0CC',
      content: <>It’s under the chair.</>,
      audioSrc: '/L09/C02/A05/EE4-L09-C02-A05-P05-02.mp3',
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
        audioSrc: '/L09/C02/A05/EE4-L09-C02-A05-P05.mp3',
        // captionSrc: '/L09/C02/A05/EE4-L09-C02-A05-P05.srt',
      }}
      data={data}
      mainKey={5}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      imageList={[
        {
          src: '/L09/C02/A05/EE4-L09-C02-A05-P05.jpg',
          alt: '여러 가구가 놓여 있는 방 안 의자 아래에 놓여 있는 손목시계, 이 손목시계를 가리키는 화살표',
          title: '여러 가구가 놓여 있는 방 안 의자 아래에 놓여 있는 손목시계, 이 손목시계를 가리키는 화살표',
        },
      ]}
    />
  );
};

export default P05;
