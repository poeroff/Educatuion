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
    src: '/L03/C03/A05/EE4-L03-C03-A05-P01.png',
    alt: '운동장에서 여자아이와 남자아이가 공 던지기 게임을 하고, 선생님은 그 모습을 보고 평가하며 할머니와 할아버지는 그 모습을 보고 손을 흔드는 모습, 선생님 아래에는 teacher, 남자아이 아래에는 friend, 할머니 아래에는 grandma, 할아버지 아래에는 grandpa가 쓰여 있는 그림',
    width: '520px',
    height: '335px',
  };

  const pageInfo = {
    pageNum: 1,
    mainKey: 1,
  };

  const data: IListenAndAnswer[] = [
    {
      content: 'teacher',
      audioSrc: '/L03/C03/A05/EE4-L03-C03-A05-P01-01.mp3',
    },
    {
      content: 'friend',
      audioSrc: '/L03/C03/A05/EE4-L03-C03-A05-P01-02.mp3',
    },
    {
      content: 'grandma',
      audioSrc: '/L03/C03/A05/EE4-L03-C03-A05-P01-03.mp3',
    },
    {
      content: 'grandpa',
      audioSrc: '/L03/C03/A05/EE4-L03-C03-A05-P01-04.mp3',
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
