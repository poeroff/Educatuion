import EEL01C02A05P01, { IListenAndAnswer } from '@/Pages/EEL01C02A05P01';
import { getCorrectData, getDefaultData } from './pageData';

const P05 = () => {
  const data: IListenAndAnswer[] = [
    {
      type: '',
      color: '',
      content: <>Don’t ______, please.</>,
      audioSrc: '',
    },
  ];

  return (
    <EEL01C02A05P01
      headerInfo={{
        headerText: 'Think and Talk',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: '사진을 보며 문장을 듣고, 말하기 버튼을 눌러 따라 말해 봅시다.',
      }}
      audioInfo={{
        audioSrc: '/L04/C02/A05/EE4-L04-C02-A05-P05.mp3',
      }}
      data={data}
      mainKey={5}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      imageList={[
        {
          src: '/L04/C02/A05/EE4-L04-C02-A05-P05.png',
          alt: '동굴에 들어가기 위해 헬멧을 쓴 채로 줄을 서고 있는 사람들과 줄 서기 안내 표지판, 출입 금지 구역에 들어가려는 사람과 출입 금지 안내 표지판, 계단에서 달리고 있는 사람과 달리기 금지 안내 표지판, 헬멧을 쓰고 있는 사람과 헬멧 쓰기 안내 표지판, 동굴 입구에서 줄을 서고 있는 남자를 뒤에 있던 여자가 밀어 그 남자가 무언가 말을 하는 모습, 그 남자 위 빈 말풍선',
          title:
            '동굴에 들어가기 위해 헬멧을 쓴 채로 줄을 서고 있는 사람들과 줄 서기 안내 표지판, 출입 금지 구역에 들어가려는 사람과 출입 금지 안내 표지판, 계단에서 달리고 있는 사람과 달리기 금지 안내 표지판, 헬멧을 쓰고 있는 사람과 헬멧 쓰기 안내 표지판, 동굴 입구에서 줄을 서고 있는 남자를 뒤에 있던 여자가 밀어 그 남자가 무언가 말을 하는 모습, 그 남자 위 빈 말풍선',
        },
      ]}
    />
  );
};

export default P05;
