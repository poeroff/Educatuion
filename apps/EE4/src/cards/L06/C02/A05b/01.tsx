import { getCorrectData, getDefaultData } from './pageData';

import EE4L06C02A05b, { IListenAndAnswer } from '@/Pages/EE4L06C02A05b';

const P01 = () => {
  const data: IListenAndAnswer[] = [
    {
      type: 'B',
      color: '#FFF0CC',
      content: (
        <>
          He’s listening to
          <br />
          music.
        </>
      ),
      audioSrc: '/L06/C02/A05b/EE4-L06-C02-A05b-P01.mp3',
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
      mainKey={1}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      imageList={[
        {
          src: '/L06/C02/A05b/EE4-L06-C02-A05b-P01.jpg',
          alt: '휠체어에 앉아 헤드폰을 끼고 음악을 듣고 있는 남자아이',
          title: '휠체어에 앉아 헤드폰을 끼고 음악을 듣고 있는 남자아이',
        },
      ]}
    />
  );
};

export default P01;
