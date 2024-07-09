import EEL07C02A05P01, { IListenAndAnswer } from '@/Pages/EEL07C02A05P01';
import { getCorrectData, getDefaultData } from './pageData';

const P05 = () => {
  const data: IListenAndAnswer[] = [
    {
      type: 'A',
      color: '#E2F2FF',
      content: <>What day is it today?</>,
      audioSrc: '/L11/C02/A05/EE4-L11-C02-A05-P05-01.mp3',
    },
    {
      type: 'B',
      color: '#FFF0CC',
      content: (
        <>
          It’s Friday.
          <br />I have robot class.
        </>
      ),
      audioSrc: '/L11/C02/A05/EE4-L11-C02-A05-P05-02.mp3',
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
        audioSrc: '/L11/C02/A05/EE4-L11-C02-A05-P05.mp3',
        // captionSrc: '/L11/C02/A05/EE4-L11-C02-A05-P05.srt',
      }}
      data={data}
      mainKey={1}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      imageList={[
        {
          src: '/L11/C02/A05/EE4-L11-C02-A05-P05.jpg',
          alt: '주소창에 방과 후 활동 시간표라고 적혀 있는 웹사이트 그림, 요리하는 남자아이 사진이 있는 월요일, 축구하는 여자아이 사진이 있는 화요일, 춤 추는 남자아이 사진이 있는 수요일, 그림을 그리고 있는 여자아이 사진이 있는 목요일, 로봇을 만들고 있는 여자아이 사진이 있는 금요일, 그 중 금요일에 표시가 되어 있는 모습',
          title:
            '주소창에 방과 후 활동 시간표라고 적혀 있는 웹사이트 그림, 요리하는 남자아이 사진이 있는 월요일, 축구하는 여자아이 사진이 있는 화요일, 춤 추는 남자아이 사진이 있는 수요일, 그림을 그리고 있는 여자아이 사진이 있는 목요일, 로봇을 만들고 있는 여자아이 사진이 있는 금요일, 그 중 금요일에 표시가 되어 있는 모습',
        },
      ]}
    />
  );
};

export default P05;
