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
    src: '/L10/C03/A05/EE4-L10-C03-A05-P01.JPG',
    alt: '횡단보도 위에 여러 직업을 가진 사람들이 지나다니는 모습, 야구 선수 복장을 하고 있는 사람이 쓰고 있는 빨간 모자에 cap이라고 쓰여 있는 모습, 버스기사 복장을 하고 있는 사람이 입고 있는 파란 셔츠에 shirt라고 쓰여 있는 모습, 탐정 복장을 하고 있는 사람이 입고 있는 긴 코트에 coat라고 쓰여 있는 모습, 가수처럼 보이는 복장을 하고 있는 사람이 입고 있는 긴 드레스에 dress라고 쓰여 있는 모습, 스튜어디스 복장을 하고 있는 사람이 입고 있는 짧은 치마에 skirt라고 쓰여 있는 모습, 요리사 복장을 하고 있는 사람이 매고 있는 짧은 스카프에 scarf라고 쓰여 있는 모습',
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
      content: 'cap',
      audioSrc: '/L10/C03/A05/EE4-L10-C03-A05-P01-01.mp3',
    },
    {
      content: 'shirt',
      audioSrc: '/L10/C03/A05/EE4-L10-C03-A05-P01-02.mp3',
    },
    {
      content: 'coat',
      audioSrc: '/L10/C03/A05/EE4-L10-C03-A05-P01-03.mp3',
    },
    {
      content: 'dress',
      audioSrc: '/L10/C03/A05/EE4-L10-C03-A05-P01-04.mp3',
    },
    {
      content: 'skirt',
      audioSrc: '/L10/C03/A05/EE4-L10-C03-A05-P01-05.mp3',
    },
    {
      content: 'scarf',
      audioSrc: '/L10/C03/A05/EE4-L10-C03-A05-P01-06.mp3',
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
