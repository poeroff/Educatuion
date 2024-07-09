import EEL01C02A05P01, { IListenAndAnswer } from '@/Pages/EEL01C02A05P01';
import { getCorrectData, getDefaultData } from './pageData';

const P03 = () => {
  const data: IListenAndAnswer[] = [
    {
      type: 'A',
      color: '#E2F2FF',
      content: (
        <>
          Let’s play
          <br />
          badminton.
        </>
      ),
      audioSrc: '/L05/C02/A05b/EE4-L05-C02-A05b-P03-01.mp3',
    },
    {
      type: 'B',
      color: '#FFF0CC',
      content: <>Sure.</>,
      audioSrc: '/L05/C02/A05b/EE4-L05-C02-A05b-P03-02.mp3',
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
        audioSrc: '/L05/C02/A05b/EE4-L05-C02-A05b-P03.mp3',
        captionSrc: '/L05/C02/A05b/EE4-L05-C02-A05b-P03.srt',
      }}
      data={data}
      mainKey={3}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      imageList={[
        {
          src: '/L05/C02/A05b/E4-L05-C02-A05b-P03.jpg',
          alt: '농구공과 수건이 있는 첫 번째 사물함 칸, 야구공이 놓여 있는 야구 글러브와 야구 방망이가 있는 두 번째 사물함 칸, 셔틀콕과 배드민턴 라켓이 놓여 있는 사물함 칸, 축구화와 축구공이 있는 네 번째 사물함 칸, 가방이 놓여져 있는 벤치, 그리고 셔틀콕과 배드민턴 라켓에 테두리가 있는 모습',
          title:
            '농구공과 수건이 있는 첫 번째 사물함 칸, 야구공이 놓여 있는 야구 글러브와 야구 방망이가 있는 두 번째 사물함 칸, 셔틀콕과 배드민턴 라켓이 놓여 있는 사물함 칸, 축구화와 축구공이 있는 네 번째 사물함 칸, 가방이 놓여져 있는 벤치, 그리고 셔틀콕과 배드민턴 라켓에 테두리가 있는 모습',
        },
      ]}
    />
  );
};

export default P03;
