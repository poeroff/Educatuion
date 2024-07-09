import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { getCorrectData, getDefaultData } from './pageData';
import EEL01C03A05P01 from '@/Pages/EEL01C03A05P01';
import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { IListenAndAnswer } from '@/Pages/EEL01C03A05P01';
const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Words and Sentences 3',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: '다음 문장을 듣고 따라 읽어 봅시다.',
    size: 'large',
  };

  const imgInfo = {
    src: '/L02/C03/A05/EE4-L02-C03-A05-P01.JPG',
    alt: 'I라고 쓰여진 여자아이를 위해 그 아이의 아빠, 엄마, 오빠, 여동생이 생일 파티를 준비하는 모습, 아빠 아래에는 dad, 오빠 아래에는 brother, 여동생 아래에는 sister, 엄마 아래에는 mom이라고 쓰여 있는 그림',
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
      content: 'dad',
      audioSrc: '/L02/C03/A05/EE4-L02-C03-A05-P01-01.mp3',
    },
    {
      content: 'brother',
      audioSrc: '/L02/C03/A05/EE4-L02-C03-A05-P01-02.mp3',
    },
    {
      content: 'sister',
      audioSrc: '/L02/C03/A05/EE4-L02-C03-A05-P01-03.mp3',
    },
    {
      content: 'mom',
      audioSrc: '/L02/C03/A05/EE4-L02-C03-A05-P01-04.mp3',
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
