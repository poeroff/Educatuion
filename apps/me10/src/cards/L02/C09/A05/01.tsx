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
      backgroundImg: '/L02/C09/A05/ME1-L02-C09-A05-P01.jpg',
      puzzle: [
        {
          width: '150px',
          word: ['There'],
        },
        {
          width: '140px',
          word: ['is'],
        },
        {
          width: '220px',
          word: ['an eraser'],
        },
        {
          width: '230px',
          word: ['on the desk.'],
        },
      ],
      audioSrc: ['/L02/C09/A05/ME1-L02-C09-A05-P01-01.mp3'],
      alt: '퍼즐 모양 배경',
    },
    {
      backgroundImg: '/L02/C09/A05/ME1-L02-C09-A05-P01.jpg',
      puzzle: [
        {
          width: '150px',
          word: ['There'],
        },
        {
          width: '140px',
          word: ['are'],
        },
        {
          width: '220px',
          word: ['many coins'],
        },
        {
          width: '230px',
          word: ['in his pocket.'],
        },
      ],
      audioSrc: ['/L02/C09/A05/ME1-L02-C09-A05-P01-02.mp3'],
      alt: '퍼즐 모양 배경',
    },
  ];
  const title = <Typography>There is/are~ ~이 있다</Typography>;

  return <ME10801 headerInfo={headerInfo} questionInfo={questionInfo} title={title} data={data} isFull={false} />;
};

export default P01;
