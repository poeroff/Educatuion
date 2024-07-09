import { getCorrectData, getDefaultData } from './pageData';
import EEL01C03A06P01 from '@/Pages/EEL01C03A06P01';

const EE40L01C03A06P02 = () => {
  const imgInfo = {
    imgSrc: '/L01/C03/A06/EE4-L01-C03-A06-P02.JPG',
    width: '448px',
    height: '380px',
    alt: '여자아이가 손에 든 아이스크림을 보며 활짝 웃고 있는 모습',
  };

  const inputInfo = [
    {
      text: 'g',
      type: 'text',
    },
    {
      text: '',
      type: 'input',
      subkey: 'TEXT-0',
      answer: 'r',
    },
    {
      text: '',
      type: 'input',
      subkey: 'TEXT-1',
      answer: 'e',
    },
    {
      text: 'a',
      type: 'text',
    },
    {
      text: '',
      type: 'input',
      subkey: 'TEXT-2',
      answer: 't',
    },
  ];

  const answers = getCorrectData(2)[0].inputDatas[0];

  const PageInfo = {
    headerText: 'Words and Sentences 2',
    questionText: '그림에 알맞은 낱말을 빈칸에 써서 완성해 봅시다.',
    mainKeyNum: 2,
    pageNumber: 2,
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

export default EE40L01C03A06P02;
