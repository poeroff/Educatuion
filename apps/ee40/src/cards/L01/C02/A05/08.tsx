import EEL01C02A05P07, { IListenAndAnswer } from '@/Pages/EEL01C02A05P07';
import { getCorrectData, getDefaultData, getSolutionData } from './pageData';

const P08 = () => {
  const data: IListenAndAnswer[] = [
    {
      type: 'A',
      color: '#E2F2FF',
      content: (
        <>
          ____________.
          <br />
          How are you?
        </>
      ),
    },
    {
      type: 'B',
      color: '#FFF0CC',
      content: (
        <>
          I’m great.
          <br />
          How are you?
        </>
      ),
      audioSrc: '/L01/C02/A05/EE4-L01-C02-A05-P07.mp3',
    },
    {
      type: 'A',
      color: '#E2F2FF',
      content: (
        <>
          ____________.
          <br />
          Thanks.
        </>
      ),
    },
  ];

  return (
    <EEL01C02A05P07
      headerInfo={{
        headerText: 'Think and Talk',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: '그림을 참고하여 때에 알맞은 인사를 하며 안부를 묻고 답해 봅시다.',
      }}
      data={data}
      mainKey={8}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      getSolutionData={getSolutionData}
      imageList={[
        {
          src: '/L01/C01/A04/EE4-L01-C01-A04-P04.png',
          alt: '해가 높이 떠 있는 모습',
          title: '해가 높이 떠 있는 모습',
          label: '때',
        },
        {
          src: '/L01/C02/A05/EE4-L01-C02-A05-P08.png',
          alt: '활짝 웃으며 두 손의 엄지 손가락을 세우고 있는 아이',
          title: '활짝 웃으며 두 손의 엄지 손가락을 세우고 있는 아이',
          label: '기분',
        },
      ]}
    />
  );
};

export default P08;
