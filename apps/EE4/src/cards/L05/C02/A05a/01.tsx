import { getCorrectData, getDefaultData } from './pageData';

import EE4L05C02A05aP01, { IListenAndAnswer } from '@/Pages/EE4L05C02A05aP01';

const P01 = () => {
  const data: IListenAndAnswer[] = [
    {
      type: '',
      color: '',
      content: <>Line up, please.</>,
      audioSrc: '/L04/C02/A05b/EE4-L04-C02-A05b-P01.mp3',
    },
  ];

  return (
    <EE4L05C02A05aP01
      headerInfo={{
        headerText: 'Think and Talk',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: '그림 속 운동 도구들을 보고 원하는 운동을 고른 후, 제안하는 말을 해 봅시다',
      }}
      data={data}
      mainKey={1}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      imageList={[
        {
          src: '/L05/C02/A05a/EE4-L05-C02-A05a-P01.jpg',
          alt: '네 칸의 캐비넷에 농구공, 야구공이 올려져 있는 야구공과 야구 방망이, 셔틀콕과 배드민턴 라켓, 축구화와 축구공이 있는 그림',
          title: '네 칸의 캐비넷에 농구공, 야구공이 올려져 있는 야구공과 야구 방망이, 셔틀콕과 배드민턴 라켓, 축구화와 축구공이 있는 그림',
        },
      ]}
    />
  );
};

export default P01;
