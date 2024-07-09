import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Reading',
  };
  const questionInfo = {
    text: '해석을 확인해 봅시다.',
  };

  const data: IListenAndAnswer[] = [
    {
      originText: 'Jihun and Minjun are doing their homework.',
      translation: '지훈이와 민준이는 학교 숙제를 하고 있다.',
    },
    {
      originText: 'Jihun goes to the library. ',
      translation: '지훈이는 도서관에 간다.',
    },
    {
      originText: 'He needs some books for his homework. ',
      translation: '그는 숙제를 위해 책이 몇 권 필요하다.',
    },
    {
      originText: 'Minjun turns on the computer and surfs the Internet. ',
      translation: '민준이는 컴퓨터를 켜고 인터넷을 검색한다.',
    },
    {
      originText: 'He gets help from the Internet.',
      translation: '그는 인터넷에서 도움을 받는다.',
    },
  ];

  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} data={data} />;
};

export default P03;
