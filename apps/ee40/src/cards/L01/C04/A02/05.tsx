import EE4L01C04A02P05 from '@/Pages/EEL01C04A02P05';
import { TSolutionData } from '@/types/contentInfo';
import { getCorrectData, getDefaultData, getSolutionData } from './pageData';

const contentInfo = {
  questionInfo: ['오전에 만난 친구', '오후에 만난 친구'],
  answerInfo: [
    { src: '/L01/C03/A03/EE4-L01-C03-A03-P01.JPG', alt: '허수아비' },
    { src: '/L01/C03/A03/EE4-L01-C03-A03-P02.JPG', alt: '사자' },
  ],
};

const layout = {
  headerInfo: { headerText: 'Class Theater', headerPattern: 'text' as const },
  questionInfo: { text: '도로시가 오전에 만난 친구와 오후에 만난 친구를 구분해 알맞은 칸에 친구의 사진을 옮기고, 때에 알맞은 인사를 말해봅시다.' },
};

const pageNumber = 5,
  mainKey = 5;

const P05 = () => {
  return (
    <EE4L01C04A02P05
      layout={layout}
      pageData={{
        pageNumber,
        mainKey,
        getDefaultData,
        getCorrectData,
        solutionData: getSolutionData(pageNumber)[0] as TSolutionData,
      }}
      contentInfo={contentInfo}
    ></EE4L01C04A02P05>
  );
};

export default P05;
