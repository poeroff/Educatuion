import EEL05C02A05P02, { IListenAndAnswer } from '@/Pages/EEL05C02A05P02';
import { getCorrectData, getDefaultData } from './pageData';

const P06 = () => {
  const data: IListenAndAnswer[] = [
    {
      type: 'A',
      color: '#E2F2FF',
      content: <>What is she doing?</>,
      audioSrc: '/L06/C02/A05/EE4-L06-C02-A05-P06-01.mp3',
    },
    {
      type: 'B',
      color: '#FFF0CC',
      content: (
        <>
          She’s making a
          <br />
          robot.
        </>
      ),
      audioSrc: '/L06/C02/A05/EE4-L06-C02-A05-P06-02.mp3',
    },
  ];

  return (
    <EEL05C02A05P02
      headerInfo={{
        headerText: 'Think and Talk',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: '사진을 보며 대화를 듣고, 말하기 버튼을 눌러 따라 말해 봅시다.',
      }}
      audioInfo={{
        audioSrc: '/L06/C02/A05/EE4-L06-C02-A05-P06.mp3',
        // captionSrc: '/L06/C02/A05/EE4-L06-C02-A05-P06.srt',
      }}
      data={data}
      mainKey={6}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      imageList={[
        {
          src: '/L06/C02/A05/EE4-L06-C02-A05-P06.jpg',
          alt: '로봇을 만들고 있는 여자아이',
          title: '로봇을 만들고 있는 여자아이',
        },
      ]}
    />
  );
};

export default P06;
