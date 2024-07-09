import { Typography, TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import ME10801, { IdataList } from '@maidt-cntn/pages/ME-108-01';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    headerText: 'A',
    iconType: 'languageUse',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '주황색 퍼즐에 유의하여 문장을 읽어 봅시다.',
  };

  const data: IdataList[] = [
    {
      backgroundImg: '/L02/C09/A02/ME1-L02-C09-A02-P01.jpg',
      puzzle: [
        {
          width: '200px',
          word: ['She'],
        },
        {
          width: '320px',
          word: ['is using'],
        },
        {
          width: '210px',
          word: ['her tablet.'],
        },
      ],
      audioSrc: ['/L02/C09/A02/ME1-L02-C09-A02-P01-01.mp3'],
      alt: '퍼즐 모양 배경',
    },
    {
      backgroundImg: '/L02/C09/A02/ME1-L02-C09-A02-P01.jpg',
      puzzle: [
        {
          width: '200px',
          word: ['Jihun'],
        },
        {
          width: '320px',
          word: ['is waiting'],
        },
        {
          width: '210px',
          word: ['for the bus.'],
        },
      ],
      audioSrc: ['/L02/C09/A02/ME1-L02-C09-A02-P01-02.mp3'],
      alt: '퍼즐 모양 배경',
    },
  ];
  const title = <Typography>am/are/is -ing ~하는 중이다</Typography>;

  return <ME10801 headerInfo={headerInfo} questionInfo={questionInfo} title={title} data={data} isFull={false} />;
};

export default P02;
