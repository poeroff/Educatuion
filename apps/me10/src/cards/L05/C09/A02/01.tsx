import { Typography, TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import ME10801, { IdataList } from '@maidt-cntn/pages/ME-108-01';

const P01 = () => {
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
      backgroundImg: '/L05/C09/A02/ME1-L05-C09-A02-P01.jpg',
      puzzle: [
        {
          width: '170px',
          word: ['Jiwoo'],
        },
        {
          width: '190px',
          word: ['gave'],
        },
        {
          width: '200px',
          word: ['me'],
        },
        {
          width: '240px',
          word: ['some advice.'],
        },
      ],
      audioSrc: ['/L05/C09/A02/ME1-L05-C09-A02-P01-01.mp3'],
      alt: '퍼즐 조각 배경',
    },
    {
      backgroundImg: '/L05/C09/A02/ME1-L05-C09-A02-P01.jpg',
      puzzle: [
        {
          width: '170px',
          word: ['Dad'],
        },
        {
          width: '190px',
          word: ['bought'],
        },
        {
          width: '200px',
          word: ['me'],
        },
        {
          width: '240px',
          word: ['lemonade.'],
        },
      ],
      audioSrc: ['/L05/C09/A02/ME1-L05-C09-A02-P01-02.mp3'],
      alt: '퍼즐 조각 배경',
    },
  ];
  const title = (
    <>
      <Typography>give/buy</Typography>
      <Typography useGap={false} fontStyle='italic'>
        A B
      </Typography>
      <Typography>A에게 B를 주다/사 주다</Typography>
    </>
  );

  return <ME10801 headerInfo={headerInfo} questionInfo={questionInfo} title={title} data={data} isFull={false} />;
};

export default P01;
