import EEL01C03A03P01 from '@/Pages/EEL01C03A03P01';
import { getCorrectData, getDefaultData, getSolutionData } from './pageData';
import { TContentInfo } from '@/types/contentInfo';

const contentInfo: TContentInfo<'img', 'text'> = {
  questionInfo: {
    questionType: 'img',
    questionImgSrc: '/L01/C03/A03/EE4-L01-C03-A03-P01.JPG',
    questionImgAlt: '실뭉치를 가지고 놀고 있는 고양이 한 마리',
    questionImgTitle: '실뭉치를 가지고 놀고 있는 고양이 한 마리',
  },
  answerInfo: {
    answerType: 'text',
    answerText: [
      { title: 'c', value: 1 },
      { title: 'a', value: 2 },
      { title: 'm', value: 3 },
      { title: 'x', value: 4 },
      { title: 'i', value: 5 },
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
    audioSrc: '/L01/C03/A03/EE4-L01-C03-A03-P01.mp3.mp3', //fileUrl?.[1] || '',
  },
};

const P01 = () => {
  return (
    <EEL01C03A03P01
      layout={layout}
      contentInfo={contentInfo}
      pageData={{
        pageNumber: 1,
        mainKey: 1,
        subKey: 'NUMBER-01',
        getDefaultData,
        getCorrectData,
        getSolutionData,
      }}
    ></EEL01C03A03P01>
  );
};

export default P01;
