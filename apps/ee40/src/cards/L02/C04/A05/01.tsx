//Page: EE4-L02-C04-A05-P01

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
    audioSrc: '/L02/C04/A05/EE4-L02-C04-A05-P01.mp3',
    // captionSrc: '/L02/C04/A05/EE4-L02-C04-A05-P01.srt',
  }

  const data: IData[] = [{ text: 'a' }, { text: 'e' }, { text: 'i' }];

  const imgInfo = {
    imgNum: 1,
    imgSrc: '/L02/C04/A05/EE4-L02-C04-A05-P01.JPG',
    alt: '의자에 앉는 사람',
    title: '의자에 앉는 사람',
    width: '448px',
    height: '234px',
  };

  const inputInfo = [
    {
      text: 's',
      type: 'text',
    },
    {
      text: '',
      type: 'input',
      subkey: 'TEXT-01',
      answer: 'i',
    },
    {
      text: 't',
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
