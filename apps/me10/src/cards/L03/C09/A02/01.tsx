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
      backgroundImg: '/L03/C09/A02/ME1-L03-C09-A02-P01.jpg',
      puzzle: [
        {
          width: '170px',
          word: ['I'],
        },
        {
          width: '180px',
          word: ['was'],
        },
        {
          width: '230px',
          word: ['excited.'],
        },
      ],
      audioSrc: ['/L03/C09/A02/ME1-L03-C09-A02-P01-01.mp3'],
      alt: '퍼즐 조각 배경',
    },
    {
      backgroundImg: '/L03/C09/A02/ME1-L03-C09-A02-P01.jpg',
      puzzle: [
        {
          width: '170px',
          word: ['They'],
        },
        {
          width: '180px',
          word: ['were'],
        },
        {
          width: '230px',
          word: ['on the field.'],
        },
      ],
      audioSrc: ['/L03/C09/A02/ME1-L03-C09-A02-P01-02.mp3'],
      alt: '퍼즐 조각 배경',
    },
  ];
  const title = <Typography>was/were, -(e)d ~이었다, ~했다</Typography>;

  return <ME10801 headerInfo={headerInfo} questionInfo={questionInfo} title={title} data={data} isFull={false} />;
};

export default P01;
