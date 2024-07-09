import { getCorrectData, getDefaultData } from './pageData';
import EEL01C03A06P01 from '@/Pages/EEL01C03A06P01';

const EE40L01C03A06P03 = () => {
  const imgInfo = {
    imgSrc: '/L01/C03/A06/EE4-L01-C03-A06-P03.JPG',
    width: '448px',
    height: '380px',
    alt: '노을이 지는 놀이터에서 손에 서류 가방을 든 남자와 여자아이가 서로 손을 들고 반갑게 만나고 있는 모습',
  };

  const inputInfo = [
    {
      text: '',
      type: 'input',
      subkey: 'TEXT-0',
      answer: 'e',
    },
    {
      text: 'v',
      type: 'text',
    },
    {
      text: 'e',
      type: 'text',
    },

    {
      text: 'n',
      type: 'text',
    },

    {
      text: '',
      type: 'input',
      subkey: 'TEXT-1',
      answer: 'i',
    },
    {
      text: 'n',
      type: 'text',
    },
    {
      text: '',
      type: 'input',
      subkey: 'TEXT-2',
      answer: 'g',
    },
  ];

  const answers = getCorrectData(3)[0].inputDatas[0];

  const PageInfo = {
    headerText: 'Words and Sentences 2',
    questionText: '그림에 알맞은 낱말을 빈칸에 써서 완성해 봅시다.',
    mainKeyNum: 3,
    pageNumber: 3,
  };

  return (
    <EEL01C03A06P01
      imgInfo={imgInfo}
      pageInfo={PageInfo}
      inputInfo={inputInfo}
      answerInfo={answers}
      getCorrectData={getCorrectData}
      getDefaultData={getDefaultData}
    />
  );
};

export default EE40L01C03A06P03;
