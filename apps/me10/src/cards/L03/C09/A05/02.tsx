import { Typography, TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import ME10801, { IdataList } from '@maidt-cntn/pages/ME-108-01';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    headerText: 'B',
    iconType: 'languageUse',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '주황색 퍼즐에 유의하여 문장을 읽어 봅시다.',
  };

  const data: IdataList[] = [
    {
      backgroundImg: '/L03/C09/A05/ME1-L03-C09-A05-P01.jpg',
      puzzle: [
        {
          width: '100px',
          word: ['I'],
        },
        {
          width: '140px',
          word: ['cannot'],
        },
        {
          width: '120px',
          word: ['believe'],
        },
        {
          width: '130px',
          word: ['it.'],
        },
      ],
      audioSrc: ['/L03/C09/A05/ME1-L03-C09-A05-P02-01.mp3'],
      alt: '퍼즐 조각 배경',
    },
    {
      backgroundImg: '/L03/C09/A05/ME1-L03-C09-A05-P02.jpg',
      puzzle: [
        {
          width: '150px',
          word: ['Can'],
        },
        {
          width: '170px',
          word: ['you'],
        },
        {
          width: '170px',
          word: ['skate?'],
        },
      ],
      audioSrc: ['/L03/C09/A05/ME1-L03-C09-A05-P02-02.mp3'],
      alt: '퍼즐 조각 배경',
    },
  ];
  const title = <Typography>can ~할 수 있다</Typography>;

  return <ME10801 headerInfo={headerInfo} questionInfo={questionInfo} title={title} data={data} isFull={false} />;
};

export default P01;
