import EE4L04C02A05b, { IListenAndAnswer } from '@/Pages/EE4L04C02A05b';
import { getCorrectData, getDefaultData } from './pageData';

const P04 = () => {
  const data: IListenAndAnswer[] = [
    {
      type: '',
      color: '',
      content: <>Put on this helmet, please.</>,
      audioSrc: '/L04/C02/A05b/EE4-L04-C02-A05b-P04.mp3',
    },
  ];

  return (
    <EE4L04C02A05b
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
          src: '/L04/C02/A05b/L04-C02-A05b-P04.jpg',
          alt: '동굴에 들어가기 위해 헬멧을 쓴 채로 줄을 서고 있는 사람들과 줄 서기 안내 표지판, 출입 금지 구역에 들어가려는 사람과 출입 금지 안내 표지판, 계단에서 달리고 있는 사람과 달리기 금지 안내 표지판, 헬멧을 쓰고 있는 사람과 헬멧 쓰기 안내 표지판, 네 개의 표지판들 중 헬멧 쓰기 안내 표지판의 크기가 큰 모습',
          title:
            '동굴에 들어가기 위해 헬멧을 쓴 채로 줄을 서고 있는 사람들과 줄 서기 안내 표지판, 출입 금지 구역에 들어가려는 사람과 출입 금지 안내 표지판, 계단에서 달리고 있는 사람과 달리기 금지 안내 표지판, 헬멧을 쓰고 있는 사람과 헬멧 쓰기 안내 표지판, 네 개의 표지판들 중 헬멧 쓰기 안내 표지판의 크기가 큰 모습',
        },
      ]}
    />
  );
};

export default P04;
