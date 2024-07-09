import HE00601 from '@maidt-cntn/pages/HE-006-01';
import { IQuestionProps } from '@maidt-cntn/ui';

const P01 = () => {
  const headerInfo = {
    headerText: 'Read and Analyze',
  };
  const questionInfo: IQuestionProps = {
    text: 'Read the book review and answer the questions.',
    size: 'medium',
  };
  const imageSrc = '/L02/C09/A02/HE1-L02-C09-A02-P01.jpg';

  const udl = [
    '풀밭 위의 동물들이 있는 책 표지 사진과 글의 구조가 보이는 도서 리뷰 글 Kim Minho  Review of Gathering of the Whakapapa',
    'Title & Author : Gathering of the Whakapapa is a short story written by Witi Ihimaera, a famous Maori writer.',
    'Plot Summary : The story is about an old man, Nani Tama, who tries to restore the whakapapa (genealogy), which had been destroyed by fire.',
    'Personal Reflection : The most moving part is when Nani and his daughter sing together on their journey to Murupara to complete the whakapapa. Reading that scene, I felt as if I were there listening to them singing.',
    'Recommendation : I recommend this story because it shows how important it is to preserve one’s own culture and traditions.',
  ];

  return (
    <HE00601 headerInfo={headerInfo} questionInfo={questionInfo} imageSrc={imageSrc} imageAlt='' udl={udl} imageHeight='400px' imageWidth='640px' />
  );
};

export default P01;
