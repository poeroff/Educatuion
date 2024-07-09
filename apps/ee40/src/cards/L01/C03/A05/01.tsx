import { getCorrectData, getDefaultData } from './pageData';
import EEL01C03A05P01 from '@/Pages/EEL01C03A05P01';
import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { IListenAndAnswer } from '@/Pages/EEL01C03A05P01';
const EE40L01C03A01P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Words and Sentences 1',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: '낱말을 하나씩 잘 듣고, 따라 말해 봅시다.',
    size: 'large',
  };

  const imgInfo = {
    src: '/L01/C03/A05/EE4-L01-C03-A05-P01.JPG',
    alt: '3개의 그림이 이어져 있는 이미지. 첫 번째 그림은 morning이라고 쓰여 있고, good이라는 단어가 위에 쓰여 있는여자아이가 산을 오르고 있고 산에는 해님이 떠오르고 있는 모습. 두 번째 그림은 afternoon이라고 쓰여 있고, great이라는 단어가 위에 쓰여 있는 여자아이가 산 정상에 올라있고 해님과 인사 하고 있는 모습. 세 번째 그림은 evening이라고 쓰여 있고, 여자아이가 산에서 내려가고 있고 해님도 산 뒤로 지고 있는 모습.',
    width: '520px',
    height: '335px',
  };

  const pageInfo = {
    pageNum: 1,
    mainKey: 1,
  };

  const data: IListenAndAnswer[] = [
    {
      content: 'Good',
      audioSrc: '/L01/C03/A05/EE4-L01-C03-A05-P01-01.mp3',
    },
    {
      content: 'morning',
      audioSrc: '/L01/C03/A05/EE4-L01-C03-A05-P01-02.mp3',
    },
    {
      content: 'great',
      audioSrc: '/L01/C03/A05/EE4-L01-C03-A05-P01-03.mp3',
    },
    {
      content: 'afternoon',
      audioSrc: '/L01/C03/A05/EE4-L01-C03-A05-P01-04.mp3',
    },
    {
      content: 'evening',
      audioSrc: '/L01/C03/A05/EE4-L01-C03-A05-P01-05.mp3',
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

export default EE40L01C03A01P01;
