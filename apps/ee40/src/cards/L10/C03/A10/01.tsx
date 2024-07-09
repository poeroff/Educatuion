import { getCorrectData, getDefaultData } from './pageData';
import EEL01C03A06P01 from '@/Pages/EEL01C03A06P01';

const P01 = () => {
  const imgInfo = {
    imgSrc: '/L10/C03/A10/EE4-L10-C03-A10-P01.JPG',
    width: '480px',
    height: '360px',
    alt: '길이가 다른 두 연필, 그 중 길이가 짧은 연필을 가리키는 화살표',
  };

  const audioInfo = {
    audioSrc: '/L10/C03/A10/EE4-L10-C03-A10-P01.mp3',
  };

  const inputInfo = [
    {
      text: '',
      type: 'input',
      subkey: 'TEXT-0',
      answer: 's',
    },
    {
      text: '',
      type: 'input',
      subkey: 'TEXT-1',
      answer: 'h',
    },
    {
      text: 'o',
      type: 'text',
    },
    {
      text: 'r',
      type: 'text',
    },
    {
      text: 't',
      type: 'text',
    },
  ];

  const answers = getCorrectData(1)[0].inputDatas[0];

  const PageInfo = {
    headerText: 'Mission 3_Quiz 1',
    questionText: '잘 듣고, 빈칸에 알맞은 글자를 써 봅시다.',
    mainKeyNum: 1,
    pageNumber: 1,
  };

  return (
    <EEL01C03A06P01
      imgInfo={imgInfo}
      pageInfo={PageInfo}
      inputInfo={inputInfo}
      audioInfo={audioInfo}
      answerInfo={answers}
      getCorrectData={getCorrectData}
      getDefaultData={getDefaultData}
    />
  );
};

export default P01;
