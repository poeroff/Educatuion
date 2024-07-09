import { getCorrectData, getDefaultData } from './pageData';
import EEL05C04A05P01 from '@/Pages/EEL05C04A05P01';
import { IData } from '@/Pages/EEL05C04A05P01';

const P01 = () => {

  const pageInfo  = {
    headerText: 'Review 2',
    questionText: '잘 듣고, 빈칸에 알맞은 글자를 <보기>에서 골라 써 봅시다.',
    mainKeyNum: 1,
    pageNumber: 1,
  };

  const audioInfo={
    audioSrc: '/L05/C04/A05/EE4-L05-C04-A05-P01.mp3',
    // captionSrc: '/L05/C04/A05/EE4-L05-C04-A05-P01.srt',
  }

  const data: IData[] = [{ text: 'a' }, { text: 'i' }, { text: 'o' }, { text: 'u' }];

  const imgInfo = {
    imgNum: 1,
    imgSrc: '/L05/C04/A05/EE4-L05-C04-A05-P01.JPG',
    alt: '상자 한 개',
    title: '상자 한 개',
    width: '448px',
    height: '234px',
  };

  const inputInfo = [
    {
      text: 'b',
      type: 'text',
    },
    {
      text: '',
      type: 'input',
      subkey: 'TEXT-01',
      answer: 'o',
    },
    {
      text: 'x',
      type: 'text',
    },
  ];

  const answers = getCorrectData(1)[0].inputDatas[0];

  return (
    <EEL05C04A05P01
      imgInfo={imgInfo}
      pageInfo={pageInfo}
      audioInfo={audioInfo}
      data={data}
      inputInfo={inputInfo}
      answerInfo={answers}
      getCorrectData={getCorrectData}
      getDefaultData={getDefaultData}
    />
  );
};

export default P01;
