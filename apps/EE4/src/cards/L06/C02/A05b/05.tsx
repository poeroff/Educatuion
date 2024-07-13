import EE4L06C02A05b, { IListenAndAnswer } from '@/Pages/EE4L06C02A05b';
import { getCorrectData, getDefaultData } from './pageData';

const P05 = () => {
  const data: IListenAndAnswer[] = [
    {
      type: 'B',
      color: '#FFF0CC',
      content: <>She’s cleaning.</>,
      audioSrc: '/L06/C02/A05b/EE4-L06-C02-A05b-P05.mp3',
    },
  ];

  return (
    <EE4L06C02A05b
      headerInfo={{
        headerText: 'Think and Talk',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: '사진을 보며 문장을 듣고, 말하기 버튼을 눌러 따라 말해 봅시다.',
      }}
      data={data}
      mainKey={5}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      imageList={[
        {
          src: '/L06/C02/A05b/EE4-L06-C02-A05b-P05.jpg',
          alt: '고무장갑을 끼고 물걸레 청소기로 청소하고 있는 여자아이',
          title: '고무장갑을 끼고 물걸레 청소기로 청소하고 있는 여자아이',
        },
      ]}
    />
  );
};

export default P05;
