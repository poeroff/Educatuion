import EE4L05C02A05aP02, { IListenAndAnswer } from '@/Pages/EE4L05C02A05aP02';
import { getCorrectData, getDefaultData } from './pageData';

const P02 = () => {
  const data: IListenAndAnswer[] = [
    {
      type: '',
      color: '',
      content: <>Don’t enter, please.</>,
      audioSrc: '/L04/C02/A05b/EE4-L04-C02-A05b-P02.mp3',
    },
  ];

  return (
    <EE4L05C02A05aP02
      headerInfo={{
        headerText: 'Think and Talk',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: '사진 속 여자아이의 제안에 거절하고, 그 이유를 말해 봅시다.',
      }}
      data={data}
      mainKey={2}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      imageList={[
        {
          src: '/L05/C02/A05a/EE4-L05-C02-A05a-P02.jpg',
          alt: '농구공을 들고, “Let’s play basketball.”이라고 말하고 있는 여자아이',
          title: '농구공을 들고, “Let’s play basketball.”이라고 말하고 있는 여자아이',
        },
      ]}
    />
  );
};

export default P02;
