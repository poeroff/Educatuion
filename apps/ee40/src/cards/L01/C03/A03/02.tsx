import EEL01C03A03P01 from '@/Pages/EEL01C03A03P01';
import { getCorrectData, getDefaultData, getSolutionData } from './pageData';
import { TContentInfo } from '@/types/contentInfo';

const contentInfo: TContentInfo<'img', 'text'> = {
  questionInfo: {
    questionType: 'img',
    questionImgSrc: '/L01/C03/A03/EE4-L01-C03-A03-P02.JPG',
    questionImgAlt: '리본이 달린 창이 넓은 노란색 모자 한 개',
    questionImgTitle: '리본이 달린 창이 넓은 노란색 모자 한 개',
  },
  answerInfo: {
    answerType: 'text',
    answerText: [
      { title: 's', value: 1 },
      { title: 'a', value: 2 },
      { title: 'd', value: 3 },
      { title: 'h', value: 4 },
      { title: 'e', value: 5 },
      { title: 't', value: 6 },
    ],
  },
};

const layout = {
  headerInfo: {
    headerText: 'Sounds and Letters 2',
    headerPattern: 'text' as const,
  },
  hQuestionInfo: {
    text: '잘 듣고, 들은 글자를 모두 선택한 후 낱말을 써 봅시다.',
  },
  audioInfo: {
    audioSrc: '/L01/C03/A03/EE4-L01-C03-A03-P02.mp3.mp3', //fileUrl?.[1] || '',
  },
};

const P02 = () => {
  return (
    <EEL01C03A03P01
      layout={layout}
      contentInfo={contentInfo}
      pageData={{
        pageNumber: 2,
        mainKey: 2,
        subKey: 'NUMBER-01',
        getDefaultData,
        getCorrectData,
        getSolutionData,
      }}
    ></EEL01C03A03P01>
  );
};

export default P02;
