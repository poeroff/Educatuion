import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData } from './pageData';

import { IImageProps, IPageInfo, IData } from '@/Pages/EEL03C04A06P01';

import EE4L06C03A07aP03 from '@/Pages/EE4L06C03A07aP03';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Words and Sentences 3',
  };

  const questionInfo: IQuestionProps = {
    text: '그림을 보고 번호에 알맞은 문장을 <보기>에서 골라쓰고, 말 해 봅시다.',
  };

  const imageInfo: IImageProps = {
    src: '/L06/C03/A07a/EE4-L06-C03-A07a-P03.png',
    alt: '외계인 친구 올리가 다른 친구들에게 ‘What are you doing?‘이라고 묻고 있는 모습, 1번 외계인 친구는 청소하고 있는 모습, 2번 외계인 친구는 요리하고 있는 모습, 3번 외계인 친구는 책을 읽고 있는 모습',
    title:
      '외계인 친구 올리가 다른 친구들에게 ‘What are you doing?‘이라고 묻고 있는 모습, 1번 외계인 친구는 청소하고 있는 모습, 2번 외계인 친구는 요리하고 있는 모습, 3번 외계인 친구는 책을 읽고 있는 모습',
    width: '455px',
    height: '234px',
    imgNum: 1,
  };

  const pageInfo: IPageInfo = {
    pageNum: 3,
    mainKey: 3,
    subKey: 'TEXT-01',
  };

  const data: IData[] = [
    { text: "I'm cleaning" },
    { text: "I'm drawing a picutre" },
    { text: "I'm cooking" },
    { text: "I'm reading a book" },
    { text: "I'm listening to music" },
  ];

  return (
    <EE4L06C03A07aP03
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      imageInfo={imageInfo}
      pageInfo={pageInfo}
      data={data}
      getCorrectData={getCorrectData}
      getDefaultData={getDefaultData}
    />
  );
};

export default P03;
