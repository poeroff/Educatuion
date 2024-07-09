//Page: EE4-L08-C04-A05-P02

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
    audioSrc: '/L08/C04/A05/EE4-L08-C04-A05-P02.mp3',
    // captionSrc: '/L08/C04/A05/EE4-L08-C04-A05-P02.srt',
  }

  const data: IData[] = [{ text: 'c' }, { text: 'ch' }, { text: 't' }, { text: 'th' }];

  const imgInfo = {
    imgNum: 2,
    imgSrc: '/L08/C04/A05/EE4-L08-C04-A05-P02.JPG',
    alt: '보라색 케이크',
    title: '보라색 케이크',
    width: '448px',
    height: '234px',
  };

  const inputInfo = [
    {
      text: '',
      type: 'input',
      subkey: 'TEXT-01',
      answer: 'c',
      width: '120px',
    },
    {
      text: 'a',
      type: 'text',
    },
    {
      text: 'k',
      type: 'text',
    },
    {
      text: 'e',
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
