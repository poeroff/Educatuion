import EE4L06C02A05b, { IListenAndAnswer } from '@/Pages/EE4L06C02A05b';
import { getCorrectData, getDefaultData } from './pageData';

const P04 = () => {
  const data: IListenAndAnswer[] = [
    {
      type: 'B',
      color: '#FFF0CC',
      content: <>He’s cooking.</>,
      audioSrc: '/L06/C02/A05b/EE4-L06-C02-A05b-P04.mp3',
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
      mainKey={4}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      imageList={[
        {
          src: '/L06/C02/A05b/EE4-L06-C02-A05b-P04.jpg',
          alt: '앞치마를 매고 샌드위치를 만들고 있는 남자아이',
          title: '앞치마를 매고 샌드위치를 만들고 있는 남자아이',
        },
      ]}
    />
  );
};

export default P04;
