import EE4L06C02A05b, { IListenAndAnswer } from '@/Pages/EE4L06C02A05b';
import { getCorrectData, getDefaultData } from './pageData';

const P02 = () => {
  const data: IListenAndAnswer[] = [
    {
      type: 'B',
      color: '#FFF0CC',
      content: (
        <>
          She’s reading a
          <br />
          book.
        </>
      ),
      audioSrc: '/L06/C02/A05b/EE4-L06-C02-A05b-P02.mp3',
    },
  ];

  return (
    <EE4L06C02A05b
      headerInfo={{
        headerText: 'Think and Talk',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: '사진을 보며 대화를 듣고, 말하기 버튼을 눌러 따라 말해 봅시다.',
      }}
      data={data}
      mainKey={2}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      imageList={[
        {
          src: '/L06/C02/A05b/EE4-L06-C02-A05b-P02.jpg',
          alt: '안경을 쓰고 책을 읽고 있는 여자아이',
          title: '안경을 쓰고 책을 읽고 있는 여자아이',
        },
      ]}
    />
  );
};

export default P02;
