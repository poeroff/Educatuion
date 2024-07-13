import EE4L06C02A05b, { IListenAndAnswer } from '@/Pages/EE4L06C02A05b';
import { getCorrectData, getDefaultData } from './pageData';

const P03 = () => {
  const data: IListenAndAnswer[] = [
    {
      type: 'B',
      color: '#FFF0CC',
      content: (
        <>
          He’s drawing a
          <br />
          picture.
        </>
      ),
      audioSrc: '/L06/C02/A05b/EE4-L06-C02-A05b-P03.mp3',
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
      mainKey={3}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      imageList={[
        {
          src: '/L06/C02/A05b/EE4-L06-C02-A05b-P03.jpg',
          alt: '도화지에 색연필로 그림을 그리고 있는 남자아이',
          title: '도화지에 색연필로 그림을 그리고 있는 남자아이',
        },
      ]}
    />
  );
};

export default P03;
