import { TMainHeaderInfoTypes, IQuestionProps, Typography } from '@maidt-cntn/ui';
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
      backgroundImg: '/L07/C09/A02/ME1-L07-C09-A02-P01.jpg',
      puzzle: [
        {
          width: '270px',
          word: ['Mauna Kea is'],
        },
        {
          width: '380px',
          word: ['taller than'],
        },
        {
          width: '270px',
          word: ['Mount Everest.'],
        },
      ],
      audioSrc: ['/L07/C09/A02/ME1-L07-C09-A02-P01-01.mp3'],
      alt: '퍼즐 모양 배경',
    },
    {
      backgroundImg: '/L07/C09/A02/ME1-L07-C09-A02-P01.jpg',
      puzzle: [
        {
          width: '270px',
          word: ['Namjun is'],
        },
        {
          width: '380px',
          word: ['more famous than'],
        },
        {
          width: '270px',
          word: ['Sara at school.'],
        },
      ],
      audioSrc: ['/L07/C09/A02/ME1-L07-C09-A02-P01-02.mp3'],
      alt: '퍼즐 모양 배경',
    },
  ];

  const title = <Typography>-er than ... / more ~ than ... …보다 더 ~한</Typography>;

  return <ME10801 headerInfo={headerInfo} questionInfo={questionInfo} title={title} data={data} isFull={true} />;
};
export default P01;
