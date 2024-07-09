import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { getCorrectData, getDefaultData } from './pageData';
import EEL05C03A05P01 from '@/Pages/EEL05C03A05P01';
import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { IListenAndAnswer } from '@/Pages/EEL05C03A05P01';
const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Words and Sentences 1',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: '어구를 하나씩 잘 듣고, 따라 말해 봅시다.',
    size: 'large',
  };

  const imgInfo = {
    src: '/L05/C03/A05/EE4-L05-C03-A05-P01.JPG',
    alt: '네 개의 운동장에서 아이들이 각기 다른 운동을 하고 있는 그림, 축구하는 아이들이 있는 운동장에는 play soccer가 쓰여 있는 그림, 야구하는 아이들이 있는 운동장에는 play baseball이 쓰여 있는 그림, 농구하는 아이들이 있는 운동장에는 play basketball이 쓰여 있는 그림, 배드민턴을 하는 아이들이 있는 운동장에는 play badminton이 쓰여 있는 그림',
    width: '462px',
    height: '394px',
  };

  const pageInfo = {
    pageNum: 1,
    mainKey: 1,
    subKey: 'RECORDER-0',
  };

  const data: IListenAndAnswer[] = [
    {
      content: 'play soccer',
      audioSrc: '/L05/C03/A05/EE4-L05-C03-A05-P01-01.mp3',
    },
    {
      content: 'play baseball',
      audioSrc: '/L05/C03/A05/EE4-L05-C03-A05-P01-02.mp3',
    },
    {
      content: 'play basketball',
      audioSrc: '/L05/C03/A05/EE4-L05-C03-A05-P01-03.mp3',
    },
    {
      content: 'play badminton',
      audioSrc: '/L05/C03/A05/EE4-L05-C03-A05-P01-04.mp3',
    },
  ];

  return (
    <EEL05C03A05P01
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
