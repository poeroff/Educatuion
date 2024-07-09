//Page: EE4-L02-C04-A05-P02

import { getCorrectData, getDefaultData } from './pageData';
import EEL05C04A05P01 from '@/Pages/EEL05C04A05P01';
import { IData } from '@/Pages/EEL05C04A05P01';

const P02 = () => {

  const pageInfo  = {
    headerText: 'Review 2',
    questionText: '잘 듣고, 빈칸에 알맞은 글자를 <보기>에서 골라 써 봅시다.',
    mainKeyNum: 2,
    pageNumber: 2,
  };

  const audioInfo={
    audioSrc: '/L02/C04/A05/EE4-L02-C04-A05-P02.mp3',
    // captionSrc: '/L02/C04/A05/EE4-L02-C04-A05-P02.srt',
  }

  const data: IData[] = [{ text: 'a' }, { text: 'e' }, { text: 'i' }];

  const imgInfo = {
    imgNum: 2,
    imgSrc: '/L02/C04/A05/EE4-L02-C04-A05-P02.JPG',
    alt: '튀어오르는 물고기',
    title: '튀어오르는 물고기',
    width: '448px',
    height: '234px',
  };

  const inputInfo = [
    {
      text: 'f',
      type: 'text',
    },
    {
      text: '',
      type: 'input',
      subkey: 'TEXT-01',
      answer: 'i',
    },
    {
      text: 's',
      type: 'text',
    },
    {
      text: 'h',
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

export default P02;
