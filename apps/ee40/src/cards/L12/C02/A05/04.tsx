import EEL01C02A05P01, { IListenAndAnswer } from '@/Pages/EEL01C02A05P01';
import { getCorrectData, getDefaultData } from './pageData';

const P04 = () => {
  const data: IListenAndAnswer[] = [
    {
      type: 'A',
      color: '#E2F2FF',
      content: (
        <>
          What do you do on <br />
          weekends?
        </>
      ),
      audioSrc: '/L12/C02/A05/EE4-L12-C02-A05-P04-01.mp3',
    },
    {
      type: 'B',
      color: '#FFF0CC',
      content: <>I watch movies.</>,
      audioSrc: '/L12/C02/A05/EE4-L12-C02-A05-P04-02.mp3',
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
        audioSrc: '/L12/C02/A05/EE4-L12-C02-A05-P04.mp3',
        // captionSrc: '/L12/C02/A05/EE4-L12-C02-A05-P04.srt',
      }}
      data={data}
      mainKey={4}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      imageList={[
        {
          src: '/L12/C02/A05/EE4-L12-C02-A05-P04.jpg',
          alt: '영화관에서 3D 안경을 쓰고 영화를 보고 있는 사람들',
          title: '영화관에서 3D 안경을 쓰고 영화를 보고 있는 사람들',
        },
      ]}
    />
  );
};

export default P04;
