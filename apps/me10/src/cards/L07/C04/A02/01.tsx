import HE00601 from '@maidt-cntn/pages/HE-006-01';
import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'About Animals: Step1',
  };

  const questionInfo: IQuestionProps = {
    text: '관심 있는 동물의 흥미로운 사실을 조사해 봅시다.',
  };

  const imageSrc = '/L07/C04/A02/ME1-L07-C04-A02-P01-01.jpg';
  const udl = [
    `인터넷 검색창에 'fun facts about pandas' 라는 글자가 입력되어있고`,
    `검색창 아래에 앵무새, 너구리, 여우, 토끼, 다람쥐, 판다, 고래, 코끼리 사진들이 있다.`,
  ];

  return (
    <HE00601 headerInfo={headerInfo} questionInfo={questionInfo} imageSrc={imageSrc} udl={udl} imageAlt='' imageHeight='285px' imageWidth='696px' />
  );
};

export default P01;
