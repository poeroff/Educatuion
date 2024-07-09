//Page: EE4-L08-C04-A05-P01

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
    audioSrc: '/L08/C04/A05/EE4-L08-C04-A05-P01.mp3',
    // captionSrc: '/L08/C04/A05/EE4-L08-C04-A05-P01.srt',
  }

  const data: IData[] = [{ text: 'c' }, { text: 'ch' }, { text: 't' }, { text: 'th' }];

  const imgInfo = {
    imgNum: 1,
    imgSrc: '/L08/C04/A05/EE4-L08-C04-A05-P01.JPG',
    alt: '초록색 의자',
    title: '초록색 의자',
    width: '448px',
    height: '234px',
  };

  const inputInfo = [
    {
      text: '',
      type: 'input',
      subkey: 'TEXT-01',
      answer: 'ch',
      width: '120px',
    },
    {
      text: 'a',
      type: 'text',
    },
    {
      text: 'i',
      type: 'text',
    },
    {
      text: 'r',
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
