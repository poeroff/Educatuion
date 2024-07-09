import { getCorrectData, getDefaultData } from './pageData';
import EEL01C03A06P01 from '@/Pages/EEL01C03A06P01';

const EE40L01C03A06P01 = () => {
  const imgInfo = {
    imgSrc: '/L01/C03/A06/EE4-L01-C03-A06-P01.JPG',
    width: '448px',
    height: '380px',
    alt: '여자아이가 기지개를 펴며 침대에서 일어나고 있는 모습. 여자아이 뒤에 있는 창문 밖에는 해님이 떠 있는 모습.',
  };

  const inputInfo = [
    {
      text: 'm',
      type: 'text',
    },
    {
      text: '',
      type: 'input',
      subkey: 'TEXT-0',
      answer: 'o',
    },
    {
      text: 'r',
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
      text: 'g',
      type: 'text',
    },
  ];

  const answers = getCorrectData(1)[0].inputDatas[0];

  const PageInfo = {
    headerText: 'Words and Sentences 2',
    questionText: '그림에 알맞은 낱말을 빈칸에 써서 완성해 봅시다.',
    mainKeyNum: 1,
    pageNumber: 1,
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

export default EE40L01C03A06P01;
