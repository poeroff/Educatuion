import EEL01C01A05P03 from '@/Pages/EEL01C01A05P03';
import { getDefaultData, getCorrectData, getSolutionData } from './pageData';
import type { TContentInfo } from '@/types/contentInfo';

const layout = {
  headerInfo: { headerText: 'Stroy1', headerPattern: 'text' as const },
  hQuestionInfo: { text: '영상을 보고, How are you?에 대한 수호와 엘라의 답을 찾아 연결해 봅시다.' },
};

const contentInfo: TContentInfo<'video', 'text'> = {
  questionInfo: {
    questionType: 'video',
    questionVideoSrc: '/L01/C01/A05/EE4-L01-C01-A05-P03.mp4',
    qusetionVideoSrt: '/L01/C01/A05/EE4-L01-C01-A05-P03.srt',
  },
  answerInfo: {
    answerType: 'text',
    answerText: [
      { title: '수호', value: 'I`m good.' },
      { title: '엘라', value: 'I`m great.' },
    ],
  },
};

const P03 = () => {
  return (
    <EEL01C01A05P03
      layout={layout}
      pageData={{
        pageNumber: 3,
        mainKey: 3,
        subKey: ['LINE-1', 'LINE-2'],
        getDefaultData,
        getCorrectData,
        getSolutionData,
      }}
      contentInfo={contentInfo}
    ></EEL01C01A05P03>
  );
};

export default P03;
