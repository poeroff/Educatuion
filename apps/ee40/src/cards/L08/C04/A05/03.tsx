//Page: EE4-L08-C04-A05-P03

import { getCorrectData, getDefaultData } from './pageData';
import EEL05C04A05P01 from '@/Pages/EEL05C04A05P01';
import { IData } from '@/Pages/EEL05C04A05P01';

const P03 = () => {

  const pageInfo  = {
    headerText: 'Review 2',
    questionText: '잘 듣고, 빈칸에 알맞은 글자를 <보기>에서 골라 써 봅시다.',
    mainKeyNum: 3,
    pageNumber: 3,
  };

  const audioInfo={
    audioSrc: '/L08/C04/A05/EE4-L08-C04-A05-P03.mp3',
    // captionSrc: '/L08/C04/A05/EE4-L08-C04-A05-P03.srt',
  }

  const data: IData[] = [{ text: 'c' }, { text: 'ch' }, { text: 't' }, { text: 'th' }];

  const imgInfo = {
    imgNum: 3,
    imgSrc: '/L08/C04/A05/EE4-L08-C04-A05-P03.JPG',
    alt: '초콜릿 한 개',
    title: '초콜릿 한 개',
    width: '400px',
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
      text: 'o',
      type: 'text',
    },
    {
      text: 'c',
      type: 'text',
    },
    {
      text: 'o',
      type: 'text',
    },
    {
      text: 'l',
      type: 'text',
    },
    {
      text: 'a',
      type: 'text',
    },
    {
      text: 't',
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

export default P03;
