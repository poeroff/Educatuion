import EEL05C02A05P02, { IListenAndAnswer } from '@/Pages/EEL05C02A05P02';
import { getCorrectData, getDefaultData } from './pageData';

const P02 = () => {
  const data: IListenAndAnswer[] = [
    {
      type: 'A',
      color: '#E2F2FF',
      content: <>Let’s play baseball.</>,
      audioSrc: '/L05/C02/A05/EE4-L05-C02-A05-P02-01.mp3',
    },
    {
      type: 'B',
      color: '#FFF0CC',
      content: <>Sorry, I can’t.</>,
      audioSrc: '/L05/C02/A05/EE4-L05-C02-A05-P02-02.mp3',
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
        audioSrc: '/L05/C02/A05/EE4-L05-C02-A05-P02.mp3',
        // captionSrc: '/L05/C02/A05/EE4-L05-C02-A05-P02.srt',
      }}
      data={data}
      mainKey={2}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      imageList={[
        {
          src: '/L05/C02/A05/EE4-L05-C02-A05-P02.jpg',
          alt: '농구공과 수건이 있는 첫 번째 사물함 칸, 야구공이 놓여 있는 야구 글러브와 야구 방망이가 있는 두 번째 사물함 칸, 셔틀콕과 배드민턴 라켓이 놓여 있는 사물함 칸, 축구화와 축구공이 있는 네 번째 사물함 칸, 가방이 놓여져 있는 벤치, 그리고 야구 글러브와 야구 방망이에 테두리가 있는 모습',
          title:
            '농구공과 수건이 있는 첫 번째 사물함 칸, 야구공이 놓여 있는 야구 글러브와 야구 방망이가 있는 두 번째 사물함 칸, 셔틀콕과 배드민턴 라켓이 놓여 있는 사물함 칸, 축구화와 축구공이 있는 네 번째 사물함 칸, 가방이 놓여져 있는 벤치, 그리고 야구 글러브와 야구 방망이에 테두리가 있는 모습',
        },
      ]}
    />
  );
};

export default P02;
