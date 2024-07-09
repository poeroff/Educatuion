import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { getCorrectData, getDefaultData } from './pageData';
import EEL01C03A05P01 from '@/Pages/EEL01C03A05P01';
import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { IListenAndAnswer } from '@/Pages/EEL01C03A05P01';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Words and Sentences 1',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: '낱말을 하나씩 잘 듣고, 따라 말해 봅시다.',
    size: 'large',
  };

  const imgInfo = {
    src: '/L04/C03/A05/EE4-L04-C03-A05-P01.JPG',
    alt: '박물관에 견학 온 학생들이 규칙에 어긋나는 행동을 하고 선생님은 이를 말리려고 하는 모습이 담긴 그림, 직원 외 출입금지 구역에 들어가는 아이에게 enter가 쓰여 있는 모습, 떠드는 아이들과 그 아이들 위에 talk가 쓰여 있는 모습, 목발을 짚고 아이스크림을 먹는 아이와 그 위에 eat이 쓰여 있는 모습, 친구를 미는 아이와 그 옆에 push가 쓰여 있는 모습, 뛰어다니는 아이와 그 옆에 run이 쓰여 있는 모습, 그리고 선생님이 이 이아들을 말리려고 하고 있는 모습',
    width: '520px',
    height: '335px',
  };

  const pageInfo = {
    pageNum: 1,
    mainKey: 1,
    subKey: 'RECORDER-0',
  };

  const data: IListenAndAnswer[] = [
    {
      content: 'enter',
      audioSrc: '/L04/C03/A05/EE4-L04-C03-A05-P01-01.mp3',
    },
    {
      content: 'talk',
      audioSrc: '/L04/C03/A05/EE4-L04-C03-A05-P01-02.mp3',
    },
    {
      content: 'eat',
      audioSrc: '/L04/C03/A05/EE4-L04-C03-A05-P01-03.mp3',
    },
    {
      content: 'run',
      audioSrc: '/L04/C03/A05/EE4-L04-C03-A05-P01-04.mp3',
    },
    {
      content: 'push',
      audioSrc: '/L04/C03/A05/EE4-L04-C03-A05-P01-05.mp3',
    },
  ];

  return (
    <EEL01C03A05P01
      imageInfo={imgInfo}
      headerInfo={headerInfo}
      pageInfo={pageInfo}
      getCorrectData={getCorrectData}
      questionInfo={questionInfo}
      getDefaultData={getDefaultData}
      data={data}
    />
  );
};

export default P01;
