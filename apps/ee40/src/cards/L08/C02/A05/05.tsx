import EEL01C02A05P01, { IListenAndAnswer } from '@/Pages/EEL01C02A05P01';
import { getCorrectData, getDefaultData } from './pageData';

const P05 = () => {
  const data: IListenAndAnswer[] = [
    {
      type: 'A',
      color: '#E2F2FF',
      content: (
        <>
          I want this glove.
          <br />
          How much is it?
        </>
      ),
      audioSrc: '/L08/C02/A05/EE4-L08-C02-A05-P05-01.mp3',
    },
    {
      type: 'B',
      color: '#FFF0CC',
      content: <>It’s 7,000 won.</>,
      audioSrc: '/L08/C02/A05/EE4-L08-C02-A05-P05-02.mp3',
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
        audioSrc: '/L08/C02/A05/EE4-L08-C02-A05-P05.mp3',
      }}
      data={data}
      mainKey={5}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      imageList={[
        {
          src: '/L08/C02/A05/EE4-L08-C02-A05-P05.jpg',
          alt: '우산, 시계, 장난감 자동차, 장난감 배, 7,000원이라고 적힌 가격표가 달린 야구 글러브, 인형을 파는 상점',
          title: '우산, 시계, 장난감 자동차, 장난감 배, 7,000원이라고 적힌 가격표가 달린 야구 글러브, 인형을 파는 상점',
        },
      ]}
    />
  );
};

export default P05;
