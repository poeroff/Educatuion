import EEL01C02A05P07, { IListenAndAnswer } from '@/Pages/EEL01C02A05P07';
import { getCorrectData, getDefaultData, getSolutionData } from './pageData';

const P07 = () => {
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
      mainKey={9}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
      getSolutionData={getSolutionData}
      imageList={[
        {
          src: '/L01/C01/A04/EE4-L01-C01-A04-P05.png',
          alt: '해가 지고 있는 모습',
          title: '해가 지고 있는 모습',
          label: '때',
        },
        {
          src: '/L01/C02/A05/EE4-L01-C02-A05-P09.png',
          alt: '기분이 좋지 않은 표정을 하고 있는 아이',
          title: '기분이 좋지 않은 표정을 하고 있는 아이',
          label: '기분',
        },
      ]}
    />
  );
};

export default P07;
